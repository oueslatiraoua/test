const express = require("express");
const router = express.Router();
const {
  addComment,
  deleteComment,
} = require("../controllers/commentControllers.js");
const middleware = require("../middelware/authmiddelware.js");
router.post("/newcomment/:postId", middleware, addComment);
router.delete("/deletecomment/:postId/:commentId", middleware, deleteComment);

module.exports = router;
