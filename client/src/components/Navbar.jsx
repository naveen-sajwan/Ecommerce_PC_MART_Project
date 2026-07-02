import React from 'react'
import { Link, NavLink } from "react-router";
import { CiUser } from "react-icons/ci";
import { FaCartArrowDown } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import {useSelector} from "react-redux";

const Navbar = () => {
  const { user,isAuthenticated } = useSelector((state) => state.auth);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  return (
    <>
  <nav className="navbar navbar-expand-lg">
  <div className="container-fluid">
    {/* <a className="navbar-brand" href="#">PC Mart</a> */}
    <NavLink to="/" className="navbar-brand" end>PC Mart</NavLink>
    <div className="d-inline-flex flex-row-reverse align-items-center gap-3">
        <a className="nav-link" href="#">
              <FaCartArrowDown className='nav_UserLogo'/>
        </a>   
    </div>    
    <div className="d-inline-flex gap-4 align-items-center nav-item dropdown nav_logos">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <CiUser className='nav_UserLogo'/>
          </a>

          {isAuthenticated &&(
            <div className="position-relative">
              <Link to="/public/wishlist">
                <FaHeart className='wishlistLogo'/>
              </Link>
              <span id="wishlistCount" className='badge bg-success'>{wishlistItems.length}</span>
              <div/>
            </div>
          )}

          {isAuthenticated &&(
            <Link id="dashboardLink" to="/public">Dashboard</Link>
          )}
          
          <ul className="dropdown-menu">
            <li><NavLink className="dropdown-item" to="/login">Signin</NavLink></li>
            <li><NavLink className="dropdown-item" to="/register">SignUp</NavLink></li>
          </ul>
    </div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
          <NavLink 
            to="/" 
            className="nav-link"
            end
          >Home</NavLink>
        </li>
        <li className="nav-item">
          {/* <a className="nav-link" href="#">AboutUs</a> */}
          <NavLink to="/about" className="nav-link" end>AboutUs</NavLink>
        </li>
        <li className="nav-item">
          {/* <a className="nav-link" href="#">ContactUs</a> */}
          <NavLink to="/contact-us" className="nav-link">ContactUs</NavLink>
        </li>
        <li className="nav-item ">
          <NavLink to="/products" className="nav-link">Products</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar