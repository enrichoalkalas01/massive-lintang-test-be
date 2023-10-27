const express = require('express')
const products = express.Router()
const { log } = require('../utils/logger')
const { httpRes } = require('../utils/responder')
const db = require("../models/config");
const { Query } = require("../models/query")
const { authorize } = require('../middlewares/auth')

// middleware
products.use((req, res, next) => authorize(req, res, next))
products.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Authorization, X-Requested-With")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, OPTION, DELETE")
    next()
})

// Add a product
products.post('/', (req, res) => {
    db.run(Query.InsertProducts(req.body.name, req.body.price), function (err){
        if (err) {
            let resp = httpRes(res.statusCode, 'Failed', {
                status: err,
            })
            log('error', JSON.stringify(resp))
            res.status(res.statusCode).json(resp)
        } else {
            db.get(Query.GetProductsById(this.lastID), (err, row) => {
                if (err) throw err
                if (row) {
                    let resp = httpRes(res.statusCode, 'Success', row)
                    log('ok', JSON.stringify(resp))
                    res.status(res.statusCode).json(resp)
                }
            });
        }
    });
})

// Get all active products
products.get('/', (req, res) => {
    db.all(Query.GetAllProducts(), (err, rows) => {
        if (err) {
            let resp = httpRes(res.statusCode, 'Failed', {
                status: err,
            })
            log('error', JSON.stringify(resp))
            res.status(res.statusCode).json(resp)
        } else {
            let resp = httpRes(res.statusCode, 'Success', rows)
            log('ok', JSON.stringify(resp))
            res.status(res.statusCode).json(resp)
        }
    })
})

// Get a product by id
products.get('/:id', (req, res) => {
    db.get(Query.GetProductsById(req.params.id), (err, row) => {
        if (err) {
            let resp = httpRes(res.statusCode, 'Failed', {
                status: err,
            })
            log('error', JSON.stringify(resp))
            res.status(res.statusCode).json(resp)
        } else {
            let resp = httpRes(res.statusCode, 'Success', row ? row : 'Data not found')
            log('ok', JSON.stringify(resp))
            res.status(res.statusCode).json(resp)
        }
    });
})

// update product
products.put('/:id', (req, res) => {
    db.run(Query.UpdateProductsById(req.params.id, req.body), function (err){
        if (err) {
            let resp = httpRes(res.statusCode, 'Failed', {
                status: err,
            })
            log('error', JSON.stringify(resp))
            res.status(res.statusCode).json(resp)
        } else {
            let resp = httpRes(res.statusCode, 'Success', `Data id=${req.params.id} has just been updated`)
            log('ok', JSON.stringify(resp))
            res.status(res.statusCode).json(resp)
        }
    });
})

// soft delete
products.delete('/:id', (req, res) => {
    db.run(Query.SoftDeleteProducts(req.params.id), function (err){
        if (err) {
            let resp = httpRes(res.statusCode, 'Failed', {
                status: err,
            })
            log('error', JSON.stringify(resp))
            res.status(res.statusCode).json(resp)
        } else {
            let resp = httpRes(res.statusCode, 'Success', `Data id=${req.params.id} has just been deleted`)
            log('ok', JSON.stringify(resp))
            res.status(res.statusCode).json(resp)
        }
    });
})

module.exports = products