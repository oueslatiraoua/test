const Post = require("../models/postModel.js");

//@desc add comment
//@route POST /api/comment/newcomment/:postId
//@access private-user

const addComment = async (req, res) => {
  try {
    const userId = req.userId;
    const { description } = req.body;

    await Post.findByIdAndUpdate(req.params.postId, {
      $push: { comments: { description, commentOwner: userId } },
    });
    res.json({ msg: "new comment" });
  } catch (err) {
    res.status(500).json({ msg: `something went wrong ${err}` });
  }
};
//@desc delete comment
//@route DELETE /api/comment/deletecomment/:postId/:commentId
//@access private-user

const deleteComment = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId });
    const checkComment = post.comments.find(
      (el) => el._id == req.params.commentId
    );
    const userId = req.userId;
    if (String(checkComment.commentOwner) !== userId)
      return res.status(401).json({ msg: "not authorized" });
    else
      await Post.findByIdAndUpdate(req.params.postId, {
        $pull: { comments: { _id: req.params.commentId } },
      });
    res.json({ msg: "comment deleted" });
  } catch (err) {
    res.status(500).json({ msg: `something went wrong ${err}` });
  }
};
module.exports = { addComment, deleteComment };
