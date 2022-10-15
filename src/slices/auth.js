import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../services/authAPI";

const initialState = {
  currentUser: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {},
  isLoginLoading: false,
  loginError: null,

  registerUser: {},
  isRegisterLoading: false,
  registerError: null,
};

export const login = createAsyncThunk("auth/login", async (loginUser) => {
  try {
    const data = await authAPI.login(loginUser);
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (error) {
    throw error;
  }
});

export const registerAccount = createAsyncThunk(
  "auth/register",
  async (registerUser) => {
    try {
      const data = await authAPI.register(registerUser);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      return {
        ...state,
        currentUser: {},
        isLoginLoading: false,
        loginError: null,
      };
    },
    resetAuth: (state) => {
      return {
        ...state,
        isLoginLoading: false,
        loginError: null,

        registerUser: {},
        isRegisterLoading: false,
        registerError: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      return { ...state, isLoginLoading: true, loginError: null };
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      return { ...state, isLoginLoading: false, currentUser: payload };
    });
    builder.addCase(login.rejected, (state, { error }) => {
      return { ...state, isLoginLoading: false, loginError: error.message };
    });

    builder.addCase(registerAccount.pending, (state) => {
      return { ...state, isLoginLoading: true, loginError: null };
    });
    builder.addCase(registerAccount.fulfilled, (state, { payload }) => {
      return { ...state, isLoginLoading: false, registerUser: payload };
    });
    builder.addCase(registerAccount.rejected, (state, { error }) => {
      return { ...state, isLoginLoading: false, registerError: error.message };
    });
  },
});

export const { logout, resetAuth } = authSlice.actions;

export default authSlice.reducer;
