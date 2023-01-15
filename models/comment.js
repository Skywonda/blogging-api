const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

const comment = mongoose.model("Comment", commentSchema)

module.exports = comment