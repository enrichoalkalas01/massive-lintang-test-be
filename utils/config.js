const dotenv = require('dotenv')
const path = require('path')
dotenv.config({ path: path.resolve(__dirname, '../.env') })

module.exports = {
    JWT_KEY: process.env.JWT_KEY,
    JWT_ALGO: process.env.JWT_ALGO,
    JWT_ISSUER: process.env.JWT_ISSUER,
};