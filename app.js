const express = require('express');
const dotConfigure = require('./service');
const app = express();
const bodyparser = require('body-parser');
const corsMiddleware = require('./middleware/cors.middleware');
const User = require('./models/user');
const { successResponse, errorResponse } = require('./utils/response');
const userRouter = require('./routes/user.routes');
const errorMiddleware = require('./middleware/error.middleware');
const AppError = require('./utils/app-error');
const { ERROR } = require('./constants/error-code.constants');
const authRouter = require('./routes/auth.routes');
const auth = require('./middleware/auth.middleware');
const setupSwagger = require('./config/swagger');

dotConfigure.init().then(() => {
    const PORT = process.env.PORT || 3000;
    console.log(`Server is running on port ${PORT}`);
    app.listen(PORT)
}).catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
});


app.use(bodyparser.json());
app.use(corsMiddleware);

setupSwagger(app);

/**
 * @openapi
 * /:
 *   get:
 *     summary: Server health check
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Server is running
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
app.get('/', (req, res) => {
    return successResponse(res, 200, 'Server is running');

});

app.use('/auth', authRouter);
app.use(auth.authMiddleWare)
app.use('/user', userRouter);




app.use((req, res, next) => {
    next(new AppError(ERROR.ROUTE_NOT_FOUND));
});
app.use(errorMiddleware);
