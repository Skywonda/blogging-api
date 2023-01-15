const commentModel = require('../models/comment')
const blogModel = require('../models/blog')

async function createComment(req, res) {
    const { postId, content } = req.body
    const post = await blogModel.findOne({ postId })
    if (!post) {
        return res.status(400).json({
            msg: 'Post with this id does not exist'
        })
    }
    const userId = req.user.id
    const comment = await commentModel.create({ author: userId, content, postId })
    res.status(201).json({
        msg: 'Comment created successfully!',
        comment
    })
}

async function getComment(req, res) {
    const commentId = req.params.id
    const comment = await commentModel.findById(commentId).populate('author').populate('postId')
    if (!comment) {
        return res.json({
            msg: 'This comment does not exist'
        })
    }
    res.json({
        msg: 'Comment found!',
        comment
    })
}



module.exports = {
    createComment,
    getComment
}