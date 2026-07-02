import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { fetchWishlist,removeFromWishlist } from "../redux/actions/wishlistActions.js";
import { toast } from "react-toastify";

export default function Wishlist() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {wishlistItems,loading,error} = useSelector(
    (state)=> state.wishlist
  );

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch])

    // Loading
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // Error
  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
  <div className="wishlist-container">
    <h1 className="wishlist-title">
      My Wishlist ({wishlistItems.length})
    </h1>
    {wishlistItems.length === 0 ? (

      <p className="wishlist-empty">
        Your wishlist is empty.
      </p>

    ) : (

      <div className="wishlist-grid">

        {wishlistItems.map((product) => (
          <div
            key={product._id}
            className="wishlist-card"
          >
            <img
              src={product.images[0].url}
              alt={product.name}
              className="wishlist-image"
               onClick={() => navigate(`/public/product/${product._id}`)}
            />
            <h2 className="wishlist-product-name">
              {product.name.substr(0, 30)}...
            </h2>
            <p className="wishlist-price">
              ${product.price}
            </p>
            <button
              onClick={() => {
                dispatch(removeFromWishlist(product._id));
                toast.success("Item removed from wishlist");
              }}
              className="wishlist-remove-btn"
            >
              Remove from Wishlist
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
</>
  );
}
