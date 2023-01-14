const express = require("express")
const authenticate = require("../middleware/authenticate")
const { validateUser, validate } = require('../middleware/userValidator')

const userRouter = express.Router()

const {
    createUser,
    getAllUser,
    loginUser,
    checkAuth,
    updateUser,
    deleteUser
} = require('../controllers/userController')

userRouter
    .route("/")
    .get(getAllUser)
    .post(validateUser(), validate, createUser)
    .put(authenticate.verifyUser, updateUser)
    .delete(authenticate.verifyUser, deleteUser)


userRouter
    .route("/login")
    .post(loginUser)

userRouter
    .route("/checkAuth")
    .get(authenticate.verifyUser, checkAuth)

userRouter
    .route("/:id")

module.exports = userRouter