const express = require("express")
const categoryRouter = express.Router()
const authenticate = require("../middleware/authenticate")

const { createCategory, getAllCategory } = require('../controllers/category')

categoryRouter
    .route('/')
    .post(authenticate.verifyUser, createCategory)
    .get(getAllCategory)

module.exports = categoryRouter;