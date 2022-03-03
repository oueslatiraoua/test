import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//************get post list
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (userInput, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/post/getposts");
      return data;
    } catch (errors) {
      return rejectWithValue(errors.response.data);
    }
  }
);
//***********add new post
export const addPost = createAsyncThunk(
  "posts/addPost",
  async (postInfo, { rejectWithValue, dispatch }) => {
    console.log("postInfo", postInfo);
    const formData = new FormData();
    formData.append("picture", postInfo.file);
    formData.append("info", JSON.stringify(postInfo.data));
    try {
      await axios.post("/api/post/newpost", formData, {
        headers: { token: localStorage.getItem("token") },
      });
      console.log("formData", formData);
      return dispatch(getPosts());
    } catch (errors) {
      return rejectWithValue(errors.response.data);
    }
  }
);
//***********like /dislike post
export const likePost = createAsyncThunk(
  "posts/likePost",
  async (postId, { rejectWithValue, dispatch }) => {
    try {
      await axios.put(`/api/post/like/${postId}`, null, {
        headers: { token: localStorage.getItem("token") },
      });
      return dispatch(getPosts());
    } catch (errors) {
      return rejectWithValue(errors.response.data);
    }
  }
);
//***********add comment to the post
export const addComment = createAsyncThunk(
  "posts/addComment",
  async (commentInfo, { rejectWithValue, dispatch }) => {
    try {
      await axios.post(
        `/api/comment/newcomment/${commentInfo.postId}`,
        { description: commentInfo.description },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      return dispatch(getPosts(), console.log("commentInfo", commentInfo));
    } catch (errors) {
      return rejectWithValue(errors.response.data);
    }
  }
);
//***********delete comment
export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (info, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(
        `/api/comment/deletecomment/${info.postId}/${info.commentId}`,

        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      return dispatch(getPosts());
    } catch (errors) {
      return rejectWithValue(errors.response.data);
    }
  }
);

//**********delete post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`/api/post/${postId}`, {
        headers: { token: localStorage.getItem("token") },
      });
      return dispatch(getPosts());
    } catch (errors) {
      return rejectWithValue(errors.response.data);
    }
  }
);
//***********update post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (postInfo, { rejectWithValue, dispatch }) => {
    const formDataUpdate = new FormData();
    formDataUpdate.append("picture", postInfo.file);
    formDataUpdate.append("info", JSON.stringify(postInfo.info));
    try {
      const { data } = await axios.put(
        `/api/post/${postInfo.info.id}`,
        formDataUpdate,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      console.log("postInfo", postInfo);
      return dispatch(getPosts());
    } catch (errors) {
      return rejectWithValue(errors.response.data);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    postList: [],
    errors: null,
    postInfo: {},
    loading: false,
  },
  extraReducers: {
    //***********get posts handler
    [getPosts.pending]: (state) => {
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.postList = action.payload;
      state.errors = null;
    },
    [getPosts.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
  },
});
export default postSlice.reducer;
