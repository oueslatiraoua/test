const express = require("express");
const router = express.Router();
const multer = require("multer");

//upload images multer function

const storage = multer.diskStorage({
  destination: "uploads/",

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
const {
  addPost,
  getPost,
  likePost,
  deletePost,
  updatePost,
} = require("../controllers/postControllers.js");
const middleware = require("../middelware/authmiddelware.js");
router.post("/newpost", upload.single("picture"), middleware, addPost);
router.get("/getposts", getPost);
router.put("/like/:postId", middleware, likePost);
router.delete("/:postId", middleware, deletePost);
router.put("/:postId", upload.single("picture"), middleware, updatePost);
//router.get("/loadPostInfo/:postId", loadPostInfo);
module.exports = router;
