import React from 'react'
import { Link } from "react-router";

const Footer = () => {

    const currentYear = new Date().getFullYear();

  return (
    <>
        <footer className="footer_wrapper">
            <div>
            <div className="inner_wrapper">
                <div className='footer_left'>
                    <div><p className='grey_text'>PC Mart</p></div>
                    <div>
                        <p className='grey_text'>Subscribe to our Mail alerts</p>
                        <div className="d-flex gap-2 ">
                            <Link className='text-decoration-none' to="/">Home</Link>
                            <Link className='text-decoration-none' to="/about">About Us</Link>
                            <Link className='text-decoration-none' to="/contact-us">Contact Us</Link>
                            <Link className='text-decoration-none' to="/products">Products</Link>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="inner_wrapper"></div>
            </div>
            <hr className='grey_text'/>
            <div className="below_underline_container d-flex justify-content-between">
                <div className="under_inner">
                    <p className='grey_text'>Designed By: Naveen Sajwan</p>
                </div>
                <div className="under_inner">
                    <p className='grey_text'>@ Copyright {currentYear} @ PC MART. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer;