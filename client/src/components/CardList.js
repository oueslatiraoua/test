import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../slices/postSlice";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

import "./CardList.css";
import CardPost from "./CardPost";

const CardList = () => {
  const { loading, postList, errors } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  //***********map cards info
  return (
    <div className="container">
      {postList &&
        postList.map((post) => (
          <>
            <ThemeProvider theme={theme}>
              <CardPost post={post} />
            </ThemeProvider>
          </>
        ))}
    </div>
  );
};

export default CardList;
