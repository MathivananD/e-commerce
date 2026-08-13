const express = require('express');
const dotConfigure = require('./service');
const app = express();
const bodyparser = require('body-parser');
const corsMiddleware = require('./middleware/cors.middleware');
const User = require('./models/user');
const validate = require('./validators/custom.validators');
const userValidation = require('./validators/user.validation');
const { successResponse, errorResponse } = require('./utils/response');
const userRouter = require('./routes/user.routes');
const errorMiddleware = require('./middleware/error.middleware');
const AppError = require('./utils/app-error');
const { ERROR } = require('./constants/error-code.constants');

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

app.get('/', (req, res) => {
    return successResponse(res, 200, 'Server is running');

});

app.use('/user', validate(userValidation), userRouter);



app.use((req, res, next) => {
    const error = ERROR.ROUTE_NOT_FOUND;
    next(new AppError(error.message, error.statusCode, error.code))
})
app.use(errorMiddleware)
