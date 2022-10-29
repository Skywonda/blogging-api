const express = require("express")
const blogRouter = express.Router()
const authenticate = require("../middleware/authenticate")



const {
    addBlogPost,
    getAllPublishedPost,
    getOnePost,
    updatePostState,
    updatePost,
    deletePost,
    listAuthorPost
} = require("../controllers/blogController")

blogRouter
    .route("/")
    .post(authenticate.verifyUser, addBlogPost)



blogRouter
    .route("/")
    .get(getAllPublishedPost)

blogRouter
    .route("/author")
    .get(authenticate.verifyUser, listAuthorPost)

blogRouter
    .route("/:id")
    .get(getOnePost)
    .put(authenticate.verifyUser, authenticate.veriryPostOwner, updatePost)
    .delete(authenticate.verifyUser, authenticate.veriryPostOwner, deletePost)


blogRouter
    .route("/state/:id")
    .put(authenticate.verifyUser, authenticate.veriryPostOwner, updatePostState)


module.exports = blogRouter