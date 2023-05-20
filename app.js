const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require('express-async-errors')

const userRouter = require("./routers/user");
const blogRouter = require("./routers/blog");
const commentRouter = require("./routers/comment");
const categoryRouter = require("./routers/category");
const bookmarkRouter = require("./routers/bookmark");
const authRouter = require("./routers/auth");

const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use(cors());

app.get("/", (req, res) => {
    res.send("hello everyone");
});

app.use("/auth", authRouter)
app.use("/users", userRouter);
app.use("/blogs", blogRouter);
app.use("/comment", commentRouter);
app.use("/category", categoryRouter);
app.use("/bookmark", bookmarkRouter)

app.use((req, res) => console.log("ghalaglahg"));

app.use(errorHandler);

module.exports = app;
