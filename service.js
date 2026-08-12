

const dotenv = require('dotenv');

const mongoose = require('mongoose');

const init = async () => {
    envConfigure();
    return await connectDB();
}

const connectDB = async () => {
    return mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`).then(() => {
        console.log('Database connected successfully');
    }).catch((err) => {
        console.error('Database connection error:', err);
        process.exit(1);
    }  )     
}

const envConfigure = () => {
    const environment = process.env.NODE_ENV || 'development';
    return dotenv.config({ path: `.env.${environment}` });
};

module.exports = { init };



