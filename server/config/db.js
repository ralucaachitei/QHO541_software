const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('MongoDB disconnected successfully');
    } catch (error) {
        console.error('MongoDB disconnection error:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = { connectDB, disconnectDB };