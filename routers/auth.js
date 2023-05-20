const express = require("express")
const authenticate = require("../middleware/authenticate")
const { loginUser, checkAuth } = require("../controllers/auth")

const authRouter = express.Router()


authRouter
  .route("/login")
  .post(loginUser)

authRouter
  .route("/checkAuth")
  .get(authenticate.verifyUser, checkAuth)

module.exports = authRouter