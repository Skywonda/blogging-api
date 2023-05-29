const mongoose = require("mongoose");
const argon2 = require("argon2");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        authProvider: {
            type: String,
            enum: ['google']
        },
        password: {
            type: String,
            select: false,
        },
        profileImage: {
            type: String,
            required: false,
        },
        bio: {
            type: String,
        },
        job: [
            {
                role: {
                    type: String,
                },
                company: {
                    type: String,
                },
            },
        ],
        socialHandle: [
            {
                name: {
                    type: String,
                },
                url: {
                    type: String,
                },
            },
        ],
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    var user = this;
    if (!user.isModified("password")) return next();
    const hash = await argon2.hash(user.password);
    user.password = hash;
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
