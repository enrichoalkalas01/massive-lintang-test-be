const express = require('express')
const auth = express.Router()
const { log } = require('../utils/logger')
const { httpRes } = require('../utils/responder')
const { GenerateJwt, VerifyJwt } = require('../utils/encoder')

auth.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Authorization, X-Requested-With")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, OPTION, DELETE")
    next()
})

auth.post('/generate', (req, res) => {
    let token = GenerateJwt(req.body)
    let resp = httpRes(res.statusCode, 'Success', token)
    log('ok', JSON.stringify(resp))
    res.status(res.statusCode).json(resp)
})

auth.post('/verify', (req, res) => {
    let result = VerifyJwt(req.body.token)
    let resp = httpRes(res.statusCode, 'Success', result)
    log('ok', JSON.stringify(resp))
    res.status(res.statusCode).json(resp)
})

module.exports = auth