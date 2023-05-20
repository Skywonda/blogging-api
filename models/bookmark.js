const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookMarkSchema = new Schema(
  {
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
    },

    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);


const Bookmark = mongoose.model("Bookmark", bookMarkSchema);
module.exports = Bookmark;