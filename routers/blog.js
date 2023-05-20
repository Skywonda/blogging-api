const express = require("express")
const blogRouter = express.Router()
const { verifyUser, verifyPostOwner } = require("../middleware/authenticate")



const {
    addBlogPost,
    getAllPublishedPost,
    getOnePost,
    updatePostState,
    updatePost,
    deletePost,
    listAuthorPost,
    likePost,
    dislikePost
} = require("../controllers/blogController")

blogRouter
    .route("/")
    .post(verifyUser, addBlogPost)



blogRouter
    .route("/")
    .get(getAllPublishedPost)

blogRouter
    .route("/author")
    .get(verifyUser, listAuthorPost)

blogRouter.route("/like").post(verifyUser, likePost)
blogRouter.route("/dislike").post(verifyUser, dislikePost)


blogRouter
    .route("/:id")
    .get(getOnePost)
    .put(verifyUser, verifyPostOwner, updatePost)
    .delete(verifyUser, verifyPostOwner, deletePost)


blogRouter
    .route("/state/:id")
    .put(verifyUser, verifyPostOwner, updatePostState)


module.exports = blogRouter