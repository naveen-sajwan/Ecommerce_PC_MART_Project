import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/axios";
import { InnerImageZoom } from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";

import "./SingleProduct.css";

const Admin_getSingleProduct = () => {
  console.log(InnerImageZoom);
  const { id } = useParams();
  const [imageIndex, setImageIndex] = useState(0)
  const [product, setProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);
  

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



        {/* Meta */}
        <div className="product-meta">

          <p>
            Category: {product.category}
          </p>

          <p>
            SKU: {product.sku || "N/A"}
          </p>

        </div>

      </div>

    </div>
  );
};

export default Admin_getSingleProduct;