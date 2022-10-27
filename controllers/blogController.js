const blogModel = require("../models/blog")

async function addBlogPost(req, res) {
    const { title, description, tags, reading_time, body } = req.body
    const author_id = await req.user.id
    const blog = await blogModel.create({ title, description, tags, reading_time, body, author_id })
    if (!blog) {
        return res.send("An error occured while creating blog")
    }
    res.status(201).json({
        msg: "Blog created successfully!",
        blog
    })
}
async function getAllPublishedPost(req, res) {
    const blogs = await blogModel.find({ state: "published" })
    res.json({
        msg: "All published post",
        blogs
    })
}


module.exports = {
    addBlogPost,
    getAllPublishedPost
}