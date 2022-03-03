import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useDisclosure } from "@chakra-ui/react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import CardContent from "@material-ui/core/CardContent";
import "./CardPost.css";
import { useDispatch, useSelector } from "react-redux";
import {
  likePost,
  deletePost,
  addComment,
  deleteComment,
} from "../slices/postSlice";
import Collapse from "@material-ui/core/Collapse";
import { Link } from "react-router-dom";
import PostModal from "../components/PostModal";
import { ChakraProvider, Input } from "@chakra-ui/react";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fff",
  },

  blogsContainer: {
    paddingTop: theme.spacing(3),
  },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3),
  },
  card: {
    Width: "100%",
  },
  media: {
    height: 180,
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
  },
  author: {
    display: "flex",
  },
}));

const CardPost = ({ post }) => {
  const [comment, setComment] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <main className="flex">
      <article>
        <CardActionArea>
          <CardMedia className={classes.media} image={post.image} />

          {userInfo._id === post.owner._id ? (
            // **********delete post icon design if you connect as a freelancer
            <i
              className="delete"
              onClick={() => dispatch(deletePost(post._id))}
              style={{
                marginRight: "18px",
                paddingBottom: "10px",
                marginLeft: "10px",
                fontSize: "18px",
                color: "Darkgreen",
                cursor: "pointer",
                transition: "0.4s ease-in-out",
              }}
              class="fa-solid fa-trash"
            >
              <span style={{ fontSize: "11px" }}> delete</span>
            </i>
          ) : null}
          {userInfo._id === post.owner._id ? (
            // **********update post icon design if you connect as a freelancer
            <ChakraProvider
              style={{
                display: "inline-flex",
                marginRight: "18px",
                paddingBottom: "10px",
                marginLeft: "10px",
                fontSize: "18px",

                cursor: "pointer",
              }}
            >
              <PostModal
                check={true}
                title={post.title}
                task={post.task}
                image={post.image}
                aboutTheService={post.aboutTheService}
                aboutTheFreelancer={post.aboutTheFreelancer}
                id={post._id}
              />
            </ChakraProvider>
          ) : null}

          {userInfo._id === post.owner._id ? (
            // ********** post price
            <ChakraProvider
              style={{
                display: "inline-flex",
                marginRight: "18px",
                paddingBottom: "10px",
                marginLeft: "10px",
                fontSize: "18px",

                cursor: "pointer",
              }}
            ></ChakraProvider>
          ) : null}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {post.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.task}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
          <Box className={classes.author}>
            <Avatar src={post.owner.picture} />

            <Box ml={2}>
              <Typography variant="subtitle2" component="p"></Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                component="p"
              >
                {post.owner.name}
                <br />
              </Typography>
            </Box>
          </Box>
          <Box>
            {userInfo._id !== post.owner._id ? (
              post.likes.length === 0 ? (
                <i
                  class="fa-solid fa-heart"
                  style={{
                    paddingBottom: "10px",
                    paddingRight: "10px",
                    paddingLeft: "10px",
                    fontSize: "18px",

                    cursor: "pointer",
                  }}
                  onClick={() => dispatch(likePost(post._id))}
                /> // **********like post icon design if you connect as a user
              ) : (
                <i
                  class="fa-solid fa-heart"
                  style={{
                    paddingBottom: "10px",
                    paddingRight: "10px",
                    paddingLeft: "10px",
                    fontSize: "18px",
                    color: "Crimson",
                    cursor: "pointer",
                  }}
                  onClick={() => dispatch(likePost(post._id))}
                />
              )
            ) : post.likes.length === 0 ? (
              <i
                class="fa-solid fa-heart"
                style={{
                  paddingBottom: "10px",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                  fontSize: "18px",
                  color: "gray",
                  cursor: "pointer",
                }}
                onClick={() => dispatch(likePost(post._id))}
              />
            ) : (
              // **********like post icon design if you connect as a freelancer
              <i
                class="fa-solid fa-heart"
                style={{
                  paddingBottom: "10px",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                  fontSize: "18px",
                  color: "Crimson",
                  cursor: "pointer",
                }}
                onClick={() => dispatch(likePost(post._id))}
              />
            )}

            <span style={{ fontSize: "18px" }}>{post.likes.length}</span>
          </Box>
        </CardActions>
        <div>
          {" "}
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Price (dt)
          </Button>
        </div>
        <div>
          <CardActions disableSpacing>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <div>
                <i
                  class="fas fa-comment-dots"
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    return dispatch(
                      addComment({
                        description: comment,
                        postId: post._id,
                      })
                    );
                  }}
                ></i>

                <form>
                  <span>
                    <input
                      style={{
                        border: " hidden blue",
                        paddingTop: "5px",
                      }}
                      placeholder="insert a comment"
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </span>
                </form>
                <div>
                  {post.comments.map((comment) => (
                    <div key={comment._id}>
                      <br />
                      <center>
                        <Box className={classes.author}>
                          <Avatar src={comment.commentOwner.picture} />

                          <Box ml={2}>
                            <Typography
                              variant="subtitle2"
                              component="p"
                            ></Typography>
                            <Typography
                              variant="subtitle2"
                              color="textSecondary"
                              component="p"
                            >
                              {comment.commentOwner.name}
                              <br />

                              {new Date(comment.createdAt)
                                .toDateString()
                                .split(" ")
                                .slice(1)
                                .join(" ")}
                            </Typography>
                          </Box>
                        </Box>
                      </center>
                      <br />

                      <h4 style={{ fontWeight: "bold" }}>
                        {comment.description}
                      </h4>
                      <br />
                      <div>
                        {userInfo._id === comment.commentOwner._id ? (
                          <i
                            class="fas fa-comment-slash"
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() =>
                              dispatch(
                                deleteComment({
                                  postId: post._id,
                                  commentId: comment._id,
                                })
                              )
                            }
                          >
                            <div style={{ fontSize: "10px", color: "red" }}>
                              {"Delete"}
                            </div>
                          </i>
                        ) : null}
                      </div>
                      <br />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Collapse>
        </div>
      </article>
    </main>
  );
};

export default CardPost;
