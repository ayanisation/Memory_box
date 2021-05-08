const express = require("express");
const mongoose = require("mongoose");
const sample = require("../operations/sample");
const PostModel = require("../models/postModel");
const { response } = require("express");

const router = new express.Router();

router.get("/", async (req, res) => {
  try {
    const newPosts = await PostModel.find().sort({ $natural: -1 });
    res.status(200).json(newPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const addPost = new PostModel(req.body);
  try {
    await addPost.save();
    res.status(201).json(addPost);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
});

router.patch("/:id/update", async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).json({ message: "post not found" });
  } else {
    try {
      const updatedPost = await PostModel.findByIdAndUpdate(
        _id,
        { ...post, _id },
        {
          new: true,
        }
      );
      res.status(200).json(updatedPost);
    } catch (error) {
      response.status(409).json({ message: error.message });
    }
  }
});

router.patch("/:id/like", async (req, res) => {
  const { id: _id } = req.params;
  const { username } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).json({ message: "post not found" });
  } else {
    try {
      const post = await PostModel.findOne({ _id });
      const liked = post.likes.indexOf(username);
      const disliked = post.dislikes.indexOf(username);
      let newLikesArr = post.likes;
      let newDislikesArr = post.dislikes;
      if (liked == -1) {
        newLikesArr.push(username);
        if (disliked > -1) newDislikesArr.splice(disliked, 1);
      } else newLikesArr.splice(liked, 1);
      const updatedPost = await PostModel.findByIdAndUpdate(
        _id,
        { likes: newLikesArr, dislikes: newDislikesArr },
        {
          new: true,
        }
      );
      res.status(200).json(updatedPost);
    } catch (error) {
      response.status(409).json({ message: error.message });
    }
  }
});

router.patch("/:id/dislike", async (req, res) => {
  const { id: _id } = req.params;
  const { username } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).json({ message: "post not found" });
  } else {
    try {
      const post = await PostModel.findOne({ _id });
      const liked = post.likes.indexOf(username);
      const disliked = post.dislikes.indexOf(username);
      let newLikesArr = post.likes;
      let newDislikesArr = post.dislikes;
      if (disliked == -1) {
        newDislikesArr.push(username);
        if (liked > -1) newLikesArr.splice(liked, 1);
      } else newDislikesArr.splice(liked, 1);
      const updatedPost = await PostModel.findByIdAndUpdate(
        _id,
        { likes: newLikesArr, dislikes: newDislikesArr },
        {
          new: true,
        }
      );
      res.status(200).json(updatedPost);
    } catch (error) {
      response.status(409).json({ message: error.message });
    }
  }
});

router.delete("/:id/delete", async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).json({ message: "post not found" });
  } else {
    try {
      await PostModel.findByIdAndRemove(_id);
      res.status(200).json({ message: "Post removed" });
    } catch (error) {
      response.status(409).json({ message: error.message });
    }
  }
});

module.exports = router;
