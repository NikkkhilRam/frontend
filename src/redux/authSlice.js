import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  user: localStorage.getItem("current_user")
    ? JSON.parse(localStorage.getItem("current_user"))
    : null,
  token: localStorage.getItem("token") || null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data.errors : error.message
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data.errors : error.message
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        localStorage.setItem("current_user", JSON.stringify(state.user));
        localStorage.setItem("token", state.token);
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          username: action.payload.username,
          email: action.payload.email,
        };
        state.token = action.payload.token;
        localStorage.setItem("current_user", JSON.stringify(state.user));
        localStorage.setItem("token", state.token);
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
  reducers: {
    login: (state, action) => {
      state.user = {
        username: action.payload.username,
        email: action.payload.email,
      };
      state.token = action.payload.token;
      localStorage.setItem("current_user", JSON.stringify(state.user));
      localStorage.setItem("token", state.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("current_user");
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
