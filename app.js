const express = require("express")
const config = require("./config/config")
const { connectToDatabase } = require("./db")
const userRouter = require("./routers/user")
const blogRouter = require("./routers/blog")
const userModel = require('./models/user')

const port = config.port

const app = express()
app.use(express.json())
connectToDatabase()

app.use("/users", userRouter)
app.use("/blogs", blogRouter)

app.get("/", (req, res) => {
    res.send("hello everyone")
})


app.listen(port, () => {
    console.log(`Server is running now on localhost:${port}`)
})
