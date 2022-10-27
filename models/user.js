const mongoose = require("mongoose")
const argon2 = require("argon2")

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        select: false
    }
},
    { timestamps: true }
)


userSchema.pre("save", async function (next) {
    var user = this
    if (!user.isModified("password")) return next()
    const hash = await argon2.hash(user.password)
    user.password = hash
    next()
})

const User = mongoose.model("User", userSchema)

module.exports = User