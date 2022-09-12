import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logIn } from "../api/loginAPI";
import jwt_decode from "jwt-decode";

const initialState = {
  loginStatus: false,
  token: "",
  username: "",
  is_staff: false,
  is_admin: false
};


export const LoginAsync = createAsyncThunk(
  "loginAPI/logIn",
  async (newlogin) => {
    const response = await logIn(newlogin);
    return response.data;
  }
);
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    checkLogin: (state) => {
      let myToken = localStorage.getItem("token");
      if (myToken) {
        state.loginStatus = true;
        state.username = jwt_decode(myToken).username;
        state.is_staff = jwt_decode(myToken).is_staff;
        state.is_admin = jwt_decode(myToken).is_superuser;
      }
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.loginStatus = false;
      state.is_staff = false;
      state.is_admin = false;
      state.username = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginAsync.fulfilled, (state, action) => {
      console.log(action.payload.access);
      state.token = action.payload.access;
      localStorage.setItem("token", state.token);
      state.loginStatus = true;
      state.username = jwt_decode(state.token).username;
      state.is_staff = jwt_decode(state.token).is_staff;
      state.is_admin = jwt_decode(state.token).is_superuser;

    });
  },
});

export const { checkLogin,logout } = loginSlice.actions;
export const selectlogin = (state) => state.login.loginStatus;
export const selectToken = (state) => state.login.token;
export const selectUsername = (state) => state.login.username;
export const selectIs_staff = (state) => state.login.is_staff;
export const selectIs_admin = (state) => state.login.is_admin;
export default loginSlice.reducer;
