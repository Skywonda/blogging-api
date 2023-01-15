const express = require("express")
const commentRouter = express.Router()
const authenticate = require("../middleware/authenticate")

const { createComment, getComment } = require('../controllers/comment')

commentRouter
    .route('/')
    .post(authenticate.verifyUser, createComment)

commentRouter
    .route('/:id')
    .get(authenticate.verifyUser, getComment)

module.exports = commentRouter;