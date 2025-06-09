import { deleteToken } from "@/lib/deleteToken";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isVerified: boolean;
  user: null | { name: string; email: string };
  isAccountEnabled: boolean;
}

const initialState: AuthState = {
  isVerified: false,
  user: null,
  isAccountEnabled: false,
};

// Add this to your authSlice or separate API slice
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      const response = await fetch("/api/logout");
      if (!response.ok) throw new Error("Logout failed");

      dispatch(logout());
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        user: { name: string; email: string };
        isAccountEnabled: boolean;
        isVerified: boolean;
      }>
    ) => {
      const { user, isAccountEnabled, isVerified } = action.payload;
      state.user = user;
      state.isAccountEnabled = isAccountEnabled;
      state.isVerified = isVerified;
    },
    verifyUser: (state) => {
      state.isVerified = true;
    },
    logout: (state) => {
      state.isVerified = false;
      state.user = null;
      state.isAccountEnabled = false;
      if (typeof window !== "undefined") {
        deleteToken("token");
        deleteToken("refreshToken");
      }
    },
  },
});

export const { setUser, logout, verifyUser } = authSlice.actions;
export default authSlice.reducer;
