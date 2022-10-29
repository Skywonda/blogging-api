const express = require("express")
const authenticate = require("../middleware/authenticate")

const userRouter = express.Router()

const {
    createUser,
    getAllUser,
    loginUser,
    updateUser,
    deleteUser
} = require('../controllers/userController')

userRouter
    .route("/")
    .get(getAllUser)
    .post(createUser)
    .put(authenticate.verifyUser, updateUser)
    .delete(authenticate.verifyUser, deleteUser)


userRouter
    .route("/login")
    .post(loginUser)

userRouter
    .route("/:id")

module.exports = userRouter