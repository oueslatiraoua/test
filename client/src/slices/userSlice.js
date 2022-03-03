import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//Register user
export const register = createAsyncThunk(
  "user/register",
  async (userInput, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("profilePicture", userInput.photo);
    formData.append("info", JSON.stringify(userInput.info));
    console.log("userInput", userInput);
    try {
      const { data } = await axios.post("/api/user/register", formData);
      console.log("data", data);
      return data;
    } catch (errors) {
      rejectWithValue(errors.response.data);
    }
  }
);

// register freelancer
export const registerFreelancer = createAsyncThunk(
  "user/registerFreelancer",
  async (userInput, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("profilePicture", userInput.photo);
    formData.append("info", JSON.stringify(userInput.info));
    console.log("userInput", userInput);
    try {
      const { data } = await axios.post(
        "/api/user/register/validation",
        formData
      );
      return data;
    } catch (errors) {
      rejectWithValue(errors.response.data);
    }
  }
);
//login
export const login = createAsyncThunk(
  "user/login",
  async (userInput, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/user/login", userInput);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},

    token: localStorage.getItem("token") || null,
    isAuth: Boolean(localStorage.getItem("isAuth")) || false,
    errors: null,
    loading: false,
  },

  reducers: {
    logout: (state) => {
      localStorage.removeItem("isAuth");
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      state.isAuth = false;
      state.token = null;
      state.userInfo = {};
    },
  },

  extraReducers: {
    //Register handler******
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("isAuth", true);
      state.isAuth = true;
      state.errors = null;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    //RegisterFreelancer handler******
    [registerFreelancer.pending]: (state) => {
      state.loading = true;
    },
    [registerFreelancer.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("isAuth", true);
      state.isAuth = true;
      state.errors = null;
    },
    [registerFreelancer.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },

    //login handler******
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;

      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      state.userInfo = action.payload.existPerson;
      localStorage.setItem("isAuth", true);
      localStorage.setItem(
        "userInfo",
        JSON.stringify(action.payload.existPerson)
      );
      state.isAuth = true;
      state.errors = null;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
  },
});
export default userSlice.reducer;
export const { logout } = userSlice.actions;
