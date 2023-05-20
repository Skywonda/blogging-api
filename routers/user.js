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
    deleteUser,
    getProfile
} = require('../controllers/user')

userRouter
    .route("/")
    .get(getAllUser)
    .post(validateUser(), validate, createUser)


userRouter
    .route('/profile/:id')
    .get(getProfile)

userRouter
    .route("/:id")
    .put(authenticate.verifyUser, updateUser)
    .delete(authenticate.verifyUser, deleteUser)

module.exports = userRouter