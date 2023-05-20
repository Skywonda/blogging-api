const express = require("express");
const bookmarkRouter = express.Router();

const { verifyUser } = require("../middleware/authenticate");
const {
  addPostToBookmark,
  removePostFromBookmark,
  getBookmark,
} = require("../controllers/bookmarks");

bookmarkRouter.use(verifyUser)

bookmarkRouter.route("/").post(addPostToBookmark).get(getBookmark);
bookmarkRouter
  .route("/remove")
  .post(removePostFromBookmark);

module.exports = bookmarkRouter;
