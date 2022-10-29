const userModel = require("../models/user")
const { hashPassword, validateUser, generateToken } = require("../config/helper")

async function loginUser(req, res) {
    const { identity, password } = req.body
    const user = await validateUser(identity, password)
    if (!user) {
        return res.status(401).send("Invalid Credentials")
    }
    const token = await generateToken({ id: user.id })
    res.json({
        msg: "Login successful!",
        token
    })
}

async function createUser(req, res) {
    let { firstname, lastname, username, email, password } = req.body
    let userExist = await userModel.findOne({ username })
    if (!userExist) {
        userExist = await userModel.findOne({ email })
    }
    if (userExist) {
        return res.status(409).send("This user already exist!")
    }
    // password = await hashPassword(password)
    const user = await userModel.create({ firstname, lastname, username, email, password })
    res.status(201).json({
        msg: "user created!",
        user
    })
}

async function getAllUser(req, res) {
    const users = await userModel.find({})
    res.status(200).json({
        msg: "all  users",
        users
    })
}

async function updateUser(req, res) {
    const { firstname, lastname } = req.body
    const user = await userModel.findByIdAndUpdate(req.user.id, { firstname, lastname }, { new: true })
    if (!user) {
        return res.status(400).send("Can't update user!")
    }
    res.json({
        msg: "Update successfull!",
        user
    })
}

async function deleteUser(req, res) {
    const user = await userModel.findByIdAndDelete(req.user.id)
    if (!user) {
        return res.status(400).send("Can't delete user!")
    }
    res.send({
        msg: "User deleted successfully!"
    })
}

module.exports = {
    createUser,
    getAllUser,
    loginUser,
    updateUser,
    deleteUser
}