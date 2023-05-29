const argon2 = require("argon2")
const jwt = require("jsonwebtoken")
const config = require("./config")
const userModel = require("../models/user")

async function hashPassword(password) {
    return await argon2.hash(password)
}

async function compareHash(plainPassword, hashedPassword) {
    return await argon2.verify(hashedPassword, plainPassword)
}

async function generateToken(payload) {
    return jwt.sign(payload, config.secret, { expiresIn: '24hr' })
}

async function validateUser(identity, password) {
    let user = await userModel.findOne({ username: identity }).select('+password')
    if (!user) {
        user = await userModel.findOne({ email: identity }).select('+password')
    }
    if (!user) {
        return false
    }
    const verifyPassword = await argon2.verify(user.password, password)
    if (!verifyPassword) {
        return false
    }
    return user
}


module.exports = {
    hashPassword,
    generateToken,
    compareHash,
    validateUser
}