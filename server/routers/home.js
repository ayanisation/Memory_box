const express = require("express");
const mongoose = require("mongoose");

const router = new express.Router();

router.get("/", (req, res) => {
  res.send("HomePage");
});
module.exports = router;