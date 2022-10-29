const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    tags: {
        type: [String]
    },
    author: {
        type: String
    },
    read_count: {
        type: Number,
        default: 0
    },
    reading_time: {
        type: String
    },
    body: {
        type: String,
        required: true
    },
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    state: {
        type: String,
        enum: ["published", "draft"],
        default: "draft"
    }
},
    { timestamps: true }
)

const Blog = mongoose.model("Blog", blogSchema)
module.exports = Blog