import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({

  name: "wishlist",

  initialState,

  reducers: {
    
    // Start Loading
    wishlistRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    // Success
    setWishlist: (state, action) => {
      state.loading = false;
      state.wishlistItems = action.payload;
      state.error = null;
    },

    // Failure
    wishlistFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Add Product
    addWishlistProduct: (state, action) => {

      const exists =
        state.wishlistItems.some(
          (item) =>
            item._id === action.payload._id
        );

      if (!exists) {
        state.wishlistItems.push(
          action.payload
        );
      }

      state.loading = false;
    },

    // Remove Product
    removeWishlistProduct: (
      state,
      action
    ) => {

      state.wishlistItems =
        state.wishlistItems.filter(
          (item) =>
            item._id !== action.payload
        );

      state.loading = false;
    },

    // Clear Wishlist
    clearWishlist: (state) => {
      state.wishlistItems = [];
      state.loading = false;
      state.error = null;
    },
  },
});

// Export Actions
export const {
  wishlistRequest,
  setWishlist,
  wishlistFail,
  addWishlistProduct,
  removeWishlistProduct,
  clearWishlist,
} = wishlistSlice.actions;

// Export Reducer
export default wishlistSlice.reducer;