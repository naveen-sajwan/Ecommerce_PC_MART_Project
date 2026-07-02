import React, { useState } from "react";
import axios from "axios";
import "./Admin.css";
import API from "../../utils/axios.js";

const Admin_Add_products = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);

    // Preview Images
    const preview = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewImages(preview);
  };

  // Submit Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      // Append Text Fields
      data.append("name", formData.name);
      data.append(
        "description",
        formData.description
      );
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("stock", formData.stock);

      // Append Images
      images.forEach((image) => {
        data.append("images", image);
      });

      const response = await API.post("/products",
        data,
        {
          headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,  // ← add this
      }
    );

      console.log(response.data);

      alert("Product Added Successfully");

      // Reset Form
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
      });

      setImages([]);
      setPreviewImages([]);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <form
        className="add-product-form"
        onSubmit={handleSubmit}
      >
        <h2>Add Product</h2>

        {/* Product Name */}
        <div className="form-group">
          <label>Product Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows="4"
            required
          />
        </div>

        {/* Price */}
        <div className="form-group">
          <label>Price</label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter product price"
            required
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category</label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
            required
          />
        </div>

        {/* Stock */}
        <div className="form-group">
          <label>Stock</label>

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock quantity"
            required
          />
        </div>

        {/* Images */}
        <div className="form-group">
          <label>Product Images</label>

          <input
            className="file-input"
            type="file"
            multiple
            accept=".png, .jpg, .jpeg, .avif, .webp"
            onChange={handleImageChange}
            required
          />
        </div>

        {/* Image Preview */}
        <div className="image-preview-container">
          {previewImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="preview"
              className="preview-image"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="submit-btn"
        >
          {loading
            ? "Uploading..."
            : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default Admin_Add_products;

