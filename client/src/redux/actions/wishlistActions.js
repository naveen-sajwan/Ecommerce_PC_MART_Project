import API from "../../utils/axios";

import {
  wishlistRequest,
  setWishlist,
  wishlistFail,
  addWishlistProduct,
  removeWishlistProduct,
} from "../slices/wishlistSlice";

// Fetch Wishlist
export const fetchWishlist = () => async (dispatch) => {
  try {
    dispatch(wishlistRequest());

    const { data } = await API.get("/wishlist");

    dispatch(setWishlist(data.products));

  } catch (error) {

    dispatch(
      wishlistFail(
        error.response?.data?.message ||
        error.message
      )
    );
  }
};

// Add To Wishlist
export const addToWishlist =
  (productId) => async (dispatch) => {
    try {
      dispatch(wishlistRequest());

      const { data } = await API.post(
        "/wishlist",
        { productId }
      );

      const latestProduct =
        data.wishlist.products[
          data.wishlist.products.length - 1
        ];

      dispatch(
        addWishlistProduct(latestProduct)
      );

    } catch (error) {

      dispatch(
        wishlistFail(
          error.response?.data?.message ||
          error.message
        )
      );
    }
  };

// Remove From Wishlist
export const removeFromWishlist =
  (productId) => async (dispatch) => {
    try {

      dispatch(wishlistRequest());

      await API.delete(
        `/wishlist/${productId}`
      );

      dispatch(
        removeWishlistProduct(productId)
      );

    } catch (error) {

      dispatch(
        wishlistFail(
          error.response?.data?.message ||
          error.message
        )
      );
    }
  };