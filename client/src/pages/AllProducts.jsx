import React, { useEffect, useState } from "react";
import "./AdminDashboard/Product.css";
import { RiHeartAdd2Line } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { useNavigate,Link } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import { addToWishlist,removeFromWishlist } from "../redux/actions/wishlistActions.js";
import {addToCart} from "../redux/actions/cartActions.js";
import { getProductsAPI } from "./AdminDashboard/getProductsAPI.js";
import { MdUpdate } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";

const AllProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated,isAuthLoading} = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
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

  useEffect(() => {
  const timer = setTimeout(() => {
      fetchProducts();
  }, 500);

    return () => clearTimeout(timer);
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

            products.map((product) => {
                  
              const isWishlisted =
                  wishlistItems.some(
                    (item) => item._id === product._id
                  );
            return(
              <div
                className="product-card"
                key={product._id}
              >

                <img
                  className="product-image"
                  src={product.images[0]?.url}
                  alt={product.name}
                  onClick={() => navigate(`/product/${product._id}`)}
                />

                <div className="product-category">  
                  <div className="category-label">        
                    <h3 className="product-name">
                      {product.name.length > 30
                        ? product.name.substr(0,30) + "...": product.name
                      }
                    </h3>
                    <p className="product-price">
                      ₹{product.price}
                    </p>
                  </div>
                </div>

                {isAuthenticated ? (
                <>  
                  <div className="productCard-btnSection">
                    <button 
                      className="add-to-cart-btn" 
                      type="button"
                      onClick={() => 
                        dispatch(addToCart(product._id, 1)) && 
                        toast.success('Item added to Cart')
                        
                      }
                    >
                      Add to Cart
                    </button>
                    <span className="wishlist-btn_wrapper">
                      {
                        isWishlisted ? (
                          <FaHeart 
                            className="wishlist-btn wishlist-added"
                            onClick={()=> {
                              dispatch(removeFromWishlist(product._id));
                              toast.success("Item removed from wishlist");
                            }}
                          />
                        ) : (
                          <RiHeartAdd2Line className="wishlist-btn" onClick={()=> {
                            dispatch(addToWishlist(product._id));
                            toast.success("Item added to wishlist")}}
                          />
                        )
                      }
                    </span>
                </div>
                </>
              ) : (
                <button className="add-to-cart-btn" onClick={() => navigate('/login')}>
                  Login to Purchase
                </button>
              )}  
              </div>
            )
            })

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

export default AllProducts;