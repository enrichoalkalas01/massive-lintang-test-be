const { JWT_KEY, JWT_ALGO, JWT_ISSUER } = require('./config')
const jwt = require('jsonwebtoken')

// generate jwt
let GenerateJwt = (data) => {
    let options = { 
        algorithm: JWT_ALGO, 
        expiresIn: "7d",
        issuer: JWT_ISSUER,
    }
    let token = jwt.sign(data, JWT_KEY, options)
    return token
}

// verify jwt
let VerifyJwt = (token) => {
    let valid
    let options = { 
        algorithm: JWT_ALGO, 
        expiresIn: "7d",
        issuer: JWT_ISSUER,
    }
    jwt.verify(token, JWT_KEY, options, function(err, decoded) {
        if (err) {
            valid = {
                status: false,
                message: err.message,
                data: null,
            }
        } else {
            valid = {
                status: true,
                message: 'valid jwt',
                data: decoded,
            }
        }
    })
    return valid
}

module.exports = { GenerateJwt, VerifyJwt }