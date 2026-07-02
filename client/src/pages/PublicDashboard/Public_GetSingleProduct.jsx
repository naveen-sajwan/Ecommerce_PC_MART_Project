import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/axios";
import { InnerImageZoom } from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import {useSelector,useDispatch} from "react-redux";
import "../AdminDashboard/SingleProduct.css";
import { useNavigate} from "react-router-dom";
import { addToCart } from "../../redux/actions/cartActions.js";
import { toast } from "react-toastify";


const Public_GetSingleProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [imageIndex, setImageIndex] = useState(0)
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  const { isAuthenticated} = useSelector((state)=> state.auth);


  // Fetch single product
  useEffect(() => {

    const fetchProduct = async () => {
      try {
        const res = await API.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  // Loading
  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="single-product-container">
      <div className="product-images">
        <InnerImageZoom
          src={product.images[imageIndex]?.url}
          zoomSrc={product.images[imageIndex]?.url}
          zoomType="hover"
          zoomPreload={true}
          alt={product.name}
        />
          
        <div className="thumbnail-container">

          {product.images.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt="thumbnail"
              className="thumbnail"
              onClick={() => setImageIndex(index)}
            />
          ))}

        </div>
      </div>

      <div className="product-details">

        <h1 className="product-title">
          {product.name}
        </h1>

        <p className="product-brand">
          Brand: {product.brand}
        </p>

        <p className="product-rating">
          ⭐ {product.averageRating || 4.5}
        </p>

        <h2 className="product-price">
          ₹{product.price}
        </h2>

        <p className="product-description">
          {product.description}
        </p>

        <p className="product-stock">
          {product.stock > 0
            ? "In Stock"
            : "Out of Stock"}
        </p>

        {/* Quantity */}
        <div className="quantity-container">

          <button
            onClick={() =>
              setQuantity((prev) =>
                prev > 1 ? prev - 1 : 1
              )
            }
          >
            -
          </button>

          <span>{quantity}</span>

          <button
            onClick={() =>
              setQuantity((prev) => prev + 1)
            }
          >
            +
          </button>

        </div>

        {/* Buttons */}
        <div className="product-actions">

          {isAuthenticated ? (
            <>
              <button className="cart-btn" onClick={() => 
                    dispatch(addToCart(product._id, quantity)) &&
                    toast.success("Item added to cart")
                  }>
                Add To Cart
              </button>
            </>
          ):(
            <>
              <button className="cart-btn" onClick={() => 
                  alert("Please login to add items to cart") ||
                  navigate("/login")
                }>
                Login to Add To Cart
              </button>
            </>
          )}
        </div>

        {/* Meta */}
        <div className="product-meta">
          <p>Category: {product.category}</p>
          <p>SKU: {product.sku || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default Public_GetSingleProduct;