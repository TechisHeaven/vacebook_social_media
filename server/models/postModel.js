const mongoose = require("mongoose");

const PostsSchema = mongoose.Schema(
  {
    PostUserID: { type: String, required: true },
    PostUserName: { type: String, required: true},
    PostUserImg: { type: String, required: true },
    PostHeading: { type: String, required: true },
    PostLikes: { type: Array, default: [] },
    PostComments: { type: Array, default: [] },
    PostShare: { type: Array, default: []},
    postImg: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const Posts = mongoose.model("posts", PostsSchema);

module.exports = Posts;
