const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const likeSchema = new Schema(
  {
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);


const Like = mongoose.model("Like", likeSchema);
module.exports = Like;