const express = require("express")

const userRouter = express.Router()

const { createUser, getAllUser, loginUser } = require('../controllers/userController')

userRouter
    .route("/")
    .get(getAllUser)
    .post(createUser)


userRouter
    .route("/login")
    .post(loginUser)

userRouter
    .route("/:id")

module.exports = userRouter