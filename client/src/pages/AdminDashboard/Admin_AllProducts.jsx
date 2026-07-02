import React, { useEffect, useState } from "react";
import "./Product.css";
import { useNavigate,Link } from "react-router-dom";
import { getProductsAPI } from "./getProductsAPI.js";
import { MdUpdate } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

const Admin_AllProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    keyword: "",
    category: "",
    min: "",
    max: "",
    sort: "",
    page: 1,
    limit: 10,
  });

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getProductsAPI(filters);

      setProducts(data);

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async(id) => {
    try{
      await axios.delete(`http://localhost:5000/api/products/${id}`,{withCredentials: true});
      setProducts((prevProducts)=>
        prevProducts.filter((product) => product._id !== id)
      );
      return toast.success("Product deleted successfully");
    }catch(error){
      console.log(error);
    }
  }

  // Run when filters change
  useEffect(() => {
    fetchProducts();
  }, [filters]);

  // Handle input changes
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (

    <div className="admin-products-container">

      <h1 className="admin-products-title">
        Products
      </h1>

      {/* Filters */}
      <div className="filters-container">

        {/* Search */}
        <input
          className="filter-input"
          type="text"
          name="keyword"
          placeholder="Search products..."
          value={filters.keyword}
          onChange={handleChange}
        />

        {/* Category */}
        <select
          className="filter-select"
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="">All Categories</option>
          <option value="cabinet">Cabinet</option>
          <option value="processor">Processor</option>
          <option value="motherboard">Motherboard</option>
          <option value="ram">RAM</option>
          <option value="storage">Storage</option>
          <option value="gpu">GPU</option>
          <option value="psu">PSU</option>
          <option value="mobile">Mobile</option>

        </select>

        {/* Min Price */}
        <input
          className="filter-input"
          type="number"
          name="min"
          placeholder="Min Price"
          value={filters.min}
          onChange={handleChange}
        />

        {/* Max Price */}
        <input
          className="filter-input"
          type="number"
          name="max"
          placeholder="Max Price"
          value={filters.max}
          onChange={handleChange}
        />

        {/* Sort */}
        <select
          className="filter-select"
          name="sort"
          value={filters.sort}
          onChange={handleChange}
        >
          <option value="">Default</option>
          <option value="price">Price Low to High</option>
          <option value="-price">Price High to Low</option>
          <option value="rating">Top Rated</option>
        </select>

      </div>

      {/* Loading */}
      {loading ? (

        <p className="loading-text">
          Loading...
        </p>

      ) : (

        <div className="products-grid">

          {products.length === 0 ? (

            <p className="empty-text">
              No products found
            </p>

          ) : (

            products.map((product) => (

              <div
                className="product-card"
                key={product._id}
              >

                <img
                  className="product-image"
                  src={product.images[0]?.url}
                  alt={product.name}
                  onClick={() => navigate(`/admin/product/${product._id}`)}
                />

                <div className="product-category">  
                  <div className="category-label">        
                    <h3 className="product-name">
                      {product.name.substring(0, 22)}...
                    </h3>
                    <p className="product-price">
                      ₹{product.price}
                    </p>
                  </div>
                  <div className="category-label">
                    <div className="function_buttons">
                      <Link to={`/admin/update-product/${product._id}`}>
                        <MdUpdate id="update_btn"/><br/>
                      </Link>
                    </div>
                    <div className="function_buttons">
                      <MdDelete onClick={() => handleDeleteProduct(product._id)} id="delete_btn"/><br/>
                    </div>
                  </div>
                </div>  

              </div>

            ))

          )}

        </div>

      )}

      {/* Pagination */}
      <div className="pagination-container">

        <button
          className="pagination-btn"
          disabled={filters.page === 1}
          onClick={() =>
            setFilters({
              ...filters,
              page: filters.page - 1,
            })
          }
        >
          Prev
        </button>

        <span className="page-number">
          Page {filters.page}
        </span>

        <button
          className="pagination-btn"
          onClick={() =>
            setFilters({
              ...filters,
              page: filters.page + 1,
            })
          }
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default Admin_AllProducts;