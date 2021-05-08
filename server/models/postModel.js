const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String },
  message: { type: String },
  creator: { type: String },
  tags: { type: String },
  selectedFile: { type: String },
  likes: [
    {
      type: String,
    },
  ],
  dislikes: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    // default: new Date(),
  },
});

const PostModel = mongoose.model("postModel", postSchema);

module.exports = PostModel;
