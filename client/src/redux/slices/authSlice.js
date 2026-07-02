import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  isAuthLoading: true,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAuthLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAuthLoading = false;
    }
  },
})

// export actions
export const {setUser,logout} = authSlice.actions;

// export reducer
export default authSlice.reducer;

