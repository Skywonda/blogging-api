const express = require("express")
const userRouter = require("./routers/user")
const blogRouter = require("./routers/blog")
const commentRouter = require("./routers/comment")
const categoryRouter = require("./routers/category")
const cors = require("cors")


const app = express()
app.use(express.json())

app.use(cors())
app.use("/users", userRouter)
app.use("/blogs", blogRouter)
app.use("/comment", commentRouter)
app.use("/category", categoryRouter)

app.get("/", (req, res) => {
    res.send("hello everyone")
})


module.exports = app
