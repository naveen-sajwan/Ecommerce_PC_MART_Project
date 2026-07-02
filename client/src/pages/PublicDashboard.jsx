import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice.js";
import API from "../utils/axios";

import "./AdminDashboard/AdminDashboard.css";

const PublicDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async()=>{
    try{
      await API.post(`http://localhost:5000/api/logout`,{withCredentials: true});
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="admin-dashboard">

      {/* Sidebar */}
      <div className="admin-sidebar">

        <h2><Link to="/public">PC MART</Link></h2>
        
        {/* <Link to="add-product">
          Add Product
        </Link> */}

        <Link to="products">
          All Products
        </Link>

        <Link to="my_orders">
          See Orders
        </Link>

        <Link to="cart">
          My Cart
        </Link>
        
        <Link to="wishlist">
          Wishlist
        </Link>

        <Link to="my_account">
          Account Info
        </Link>

         <Link 
            onClick={handleLogout}
          >
            Logout
          </Link>

      </div>

      {/* Content */}
      <div className="admin-content">

        <Outlet />

      </div>

    </div>
  );
};

export default PublicDashboard;