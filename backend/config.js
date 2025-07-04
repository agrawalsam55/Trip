require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
const mongoURI = process.env.MONGO_URI;

module.exports = { jwtSecret, mongoURI };
