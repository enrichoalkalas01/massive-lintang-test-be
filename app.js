// packages
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const { httpRes } = require('./utils/responder')
const { log } = require('./utils/logger')
const dotenv = require('dotenv')
dotenv.config()

// route sources
const app = express()
const auth = require('./routes/auth')
const posts = require('./routes/posts')
const products = require('./routes/products')

// middleware
app.use(express.json())
app.use(cors())
// app.set('trust proxy', true)
// app.disable('etag')
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, OPTION, DELETE")
    next()
})

// ping
const info = fs.readFileSync('package.json')
const package = JSON.parse(info)
app.get('/ping', (req, res) => {
    let resp = httpRes(res.statusCode, 'Success', {
        project: package.name,
        version: package.version,
        description: package.description, 
    })
    res.status(res.statusCode).json(resp)
})

// routes
app.use('/auth', auth)
app.use('/posts', posts)
app.use('/products', products)

// error handler
app.use((req, res, next) => {
    log('error', `ROUTE IS NOT FOUND`)
    return res.status(404).json({ status: 404, error: 'Not found' })
})
app.use((error, req, res, next) => {
    log('error', error.toString())
    return res.status(500).json({ status: 500, error: error.toString() })
})

// serve
app.listen(process.env.PORT, () => {
    log('info', `SERVER IS RUNNING ON ${process.env.PORT}`)
})