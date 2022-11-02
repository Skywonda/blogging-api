const express = require("express")
const userRouter = require("./routers/user")
const blogRouter = require("./routers/blog")
const userModel = require('./models/user')
const cors = require("cors")


const app = express()
app.use(express.json())

app.use(cors())
app.use("/users", userRouter)
app.use("/blogs", blogRouter)

app.get("/", (req, res) => {
    res.send("hello everyone")
})


module.exports = app
