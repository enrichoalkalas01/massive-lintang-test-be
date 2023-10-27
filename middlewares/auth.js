const { log, httpLog } = require('../utils/logger')
const { httpRes } = require('../utils/responder')
const { VerifyJwt } = require('../utils/encoder')

function authorize(req, res, next){
    let auth = req.header('Authorization')
    if (auth != null && auth.startsWith('Bearer ')){
        let token = auth.split(' ')[1]
        let jwt = VerifyJwt(token)
        if (jwt.status == true){
            req.validUser = jwt.data    // data user
            next()
        } else {
            let resp = httpRes(401, 'Unauthorized', `Invalid auth key ${jwt.message}`)
            res.status(401).json(resp)
            log('error', httpLog(req, resp))
        }
    } else {
        let resp = httpRes(401, 'Unauthorized', 'Invalid auth key')
        res.status(401).json(resp)
        log('error', httpLog(req, resp))
    }
}

module.exports = { authorize }