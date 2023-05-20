const Bookmark = require('../models/bookmark')
const Blog = require("../models/blog");
const { BadRequestError, NotFoundError } = require('../errors/errors');



async function addPostToBookmark(req, res) {
  const { postId } = req.body;
  const user = req.user;
  const post = await Blog.findById(postId);
  if (!post) throw new NotFoundError("Post not found!");

  const bookmarkExist = await Bookmark.findOne({ post: post.id, owner: user.id });
  if (bookmarkExist) throw new BadRequestError("You've already added this post to bookmark!");
  const bookmark = await Bookmark.create({ owner: user.id, post: post.id })
  res.json({
    msg: 'post bookmarked!',
    bookmark
  })
}

async function getBookmark(req, res) {
  const user = req.user
  const bookmarks = await Bookmark.find({ owner: user.id })
  res.json({
    msg: "Bookmark list",
    bookmarks
  })
}

async function removePostFromBookmark(req, res) {
  const { postId } = req.body;
  const user = req.user;
  const post = await Blog.findById(postId);
  if (!post) throw new NotFoundError("Post not found!");

  const bookmarkExist = await Bookmark.findOne({ post: post.id, owner: user.id });
  if (!bookmarkExist) throw new BadRequestError("You haven't added this post to bookmark!");
  await bookmarkExist.delete()
  res.status(204).json({
    msg: 'post removed from bookmark!',
  })
}


module.exports = {
  addPostToBookmark,
  removePostFromBookmark,
  getBookmark
}