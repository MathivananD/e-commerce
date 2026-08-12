const express = require('express');
const dotConfigure = require('./service');
const app = express();
const bodyparser = require('body-parser');
const corsMiddleware = require('./middleware/cors.middleware');
const User = require('./models/user');
const validate = require('./validators/custom.validators');
const userValidation = require('./validators/user.validation');
const { successResponse, errorResponse } = require('./utils/response');

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
    console.log(req.headers);
   return successResponse(res, 200, 'Server is running');

});

app.post('/', validate(userValidation), (req, res) => {
    res.status(200).json({ message: 'Added succesfuly' });

});

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
})