const express = require("express")
const blogRouter = express.Router()
const authenticate = require("../middleware/authenticate")



const {
    addBlogPost,
    getAllPublishedPost
} = require("../controllers/blogController")

blogRouter
    .route("/")
    .post(authenticate.verifyUser, addBlogPost)



blogRouter
    .route("/")
    .get(getAllPublishedPost)


module.exports = blogRouter