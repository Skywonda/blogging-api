const mongoose = require('mongoose')

const Schema = mongoose.Schema
const blogSchema = new Schema({
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
        type: Number
    },
    body: {
        type: String,
        required: true
    },
    image: [
        {
            type: String,
            required: false
        }
    ],
    owner: {
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

blogSchema.pre("save", async function (next) {
    const blogCout = this.body.split(" ").length
    const desCount = this.body.split(" ").length
    const titleCount = this.body.split(" ").length

    let readTime;
    let sum = (blogCout + desCount + titleCount) / 200
    sum < 1 ? readTime = 1 : readTime = Math.round(sum)
    this.reading_time = readTime;
    next()
})

const Blog = mongoose.model("Blog", blogSchema)
module.exports = Blog