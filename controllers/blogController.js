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
    // const posts = await blogModel.find({ state: "published" })
    // res.json({
    //     msg: "All published post",
    //     posts
    // })
    // { $and: [{ $or: [{ title: regex }, { description: regex }] }] }
    const limit = parseInt(req.query.limit) || 20
    const page = parseInt(req.query.page) || 0
    let sort = req.query.sort
    const skip = limit * page

    const valideSort = ['read_count', 'timestamps', 'reading_time'].includes(sort)
    valideSort ? null : sort = 'read_count'
    let regex = new RegExp(req.query.search, 'i');
    const posts = await blogModel.find({
        state: "published",
        $and: [
            {
                $or: [
                    { title: regex },
                    { author: regex },
                    { tags: regex }
                ],
            },
        ],
    },
    ).limit(limit).skip(skip).sort({ [sort]: -1 })
    res.json({
        msg: "found!",
        posts
    })
}

async function getOnePost(req, res) {
    const post = await blogModel.findById(req.params.id)
    if (!post) {
        return res.status(404).send("Post not found!")
    }
    post.read_count += 1
    await post.save()
    res.json({
        msg: "A single post",
        post
    })
}

async function updatePostState(req, res) {
    const { state } = req.body
    if (!['draft', 'published'].includes(state)) {
        return res.status(401).send("Bad Request!")
    }
    const post = await blogModel.findByIdAndUpdate(req.params.id, { state }, { new: true })
    if (!post) {
        return res.status(404).send("Post not found!")
    }
    res.json({
        msg: "Post state updated successfully!",
        post
    })
}

async function updatePost(req, res) {
    const { title, description, body, tags, reading_time } = req.body
    const post = await blogModel.findByIdAndUpdate(req.params.id, { title, description, body, tags, reading_time }, { new: true })
    if (!post) {
        return res.status(404).send("Post to update not found")
    }
    res.json({
        msg: "update successfull",
        post
    })
}

async function deletePost(req, res) {
    const post = await blogModel.findByIdAndDelete(req.params.id)
    if (!post) {
        return res.status(404).send("Post to delete not found!")
    }
    res.json({
        msg: "Deleted successfully!",
        post
    })
}

async function listAuthorPost(req, res) {
    const state = req.query.state || "published"
    const page = parseInt(req.query.page) || 0
    const limit = parseInt(req.query.limit) || 10
    if (!["published", "draft"].includes(state)) {
        return res.json({ msg: "Invalid state input" })
    }
    const posts = await blogModel.aggregate([
        {
            $match: {
                author_id: req.user._id,
                state: state
            },
        },
        { $skip: (page * limit) },
        { $limit: limit }

    ])
    if (!posts) {
        return res.status(404).send("No match found!")
    }
    return res.json({
        msg: "Found",
        data: posts
    })
}

module.exports = {
    addBlogPost,
    getAllPublishedPost,
    getOnePost,
    updatePostState,
    updatePost,
    deletePost,
    listAuthorPost
}