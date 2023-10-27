const express = require('express')
const posts = express.Router()
const { log } = require('../utils/logger')
const { httpRes } = require('../utils/responder')
const db = require("../models/config");
const { Query } = require("../models/query")
const { authorize } = require('../middlewares/auth')

// middleware
posts.use((req, res, next) => authorize(req, res, next))
posts.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Authorization, X-Requested-With")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, OPTION, DELETE")
    next()
})

// Add a post
posts.post('/', (req, res) => {
    db.run(Query.InsertPosts(req.body.username, req.body.text), function (err){
        if (err) {
            let resp = httpRes(res.statusCode, 'Failed', {
                status: err,
            })
            log('error', JSON.stringify(resp))
            res.status(res.statusCode).json(resp)
        } else {
            db.get(Query.GetPostsById(this.lastID), (err, row) => {
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

// Get all active posts
posts.get('/', (req, res) => {
    db.all(Query.GetAllPosts(), (err, rows) => {
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

// Get a post by id
posts.get('/:id', (req, res) => {
    db.get(Query.GetPostsById(req.params.id), (err, row) => {
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

// update post
posts.put('/:id', (req, res) => {
    db.run(Query.UpdatePostsById(req.params.id, req.body), function (err){
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
posts.delete('/:id', (req, res) => {
    db.run(Query.SoftDeletePosts(req.params.id), function (err){
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

module.exports = posts