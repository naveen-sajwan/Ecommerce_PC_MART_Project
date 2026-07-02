import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import API from "../utils/axios";
import {useDispatch} from "react-redux";
import {removeFromCart,fetchCart,addToCart,updateCartQuantity} from "../redux/actions/cartActions.js";
import "./CartPage.css";
import { loadRazorpay } from "../utils/loadRazorpay";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading,cartItems,error,totalPrice,totalQuantity} = useSelector((state) => state.cart);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  // Fetch Cart
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);


  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const loaded = await loadRazorpay();
    if(!loaded){
      alert("Failed to Load Razorpay")
      return;
    }

    const {data} = await API.post(`/payment/create-order`,
      { shippingAddress }
    );

    const razorpayOrder = data.razorpayOrder;
    console.log(razorpayOrder);

    const options = {

      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount:
        razorpayOrder.amount,

      currency:
        razorpayOrder.currency,

      order_id:
        razorpayOrder.id,

      name: "My Store",

      description:
        "Order Payment",

      handler: async function (
        response
      ) {

        await API.post(
          "/payment/verify-payment",
          response
        );

        navigate("/payment-success");
      },

      prefill: {
        name: "Customer",
      },

      theme: {
        color: "#3399cc",
      },
    };
    
    console.log("RAZORPAY KEY:",import.meta.env.VITE_RAZORPAY_KEY_ID);

    const paymentObject = new window.Razorpay(options);
      paymentObject.open();

  };


  if (loading) {
    return <h2>Loading Cart...</h2>;
  }

  // Empty Cart
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty 🛒</h2>
      </div>
    );
  }

const increaseQuantity = (item) => {
    dispatch(
        updateCartQuantity(
            item.product._id,
            item.quantity + 1
        )
    );
};

const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
        dispatch(
            updateCartQuantity(
                item.product._id,
                item.quantity - 1
            )
        );
    }
};



  return (
    <div className="cart-container">

      {/* LEFT */}
      <div className="cart-items">

        <h2>Your Cart</h2>

        {cartItems.map((item) => (
          <>
          <div key={item.product._id} className="cart_items_wrapper">
            <img 
              src={item.product.images[0]?.url}
              alt={item.product.name}
              className="cart-image"  
            />
            <div className="product_desc">
              <div className="product_title">
                <h5 title={item.product.name}>{item.product.name.substr(0,25)}...</h5>
                <p className="fw-bold">₹{item.product.price}</p>
              </div>
              <p className="fw-bold">{item.product.category}</p>
              <p className="fw-bold">Quantity : {item.quantity}</p>
              <div className="cart-subtotal">
               ₹ {item.product.price * item.quantity}
              </div>
            </div>

          </div>
          <div className="cart_functions">
            <div className="cart-quantity">
                  <button onClick={() => decreaseQuantity(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() =>increaseQuantity(item)}>
                    +
                  </button>
            </div>

            <button
              className="remove-btn"
              onClick={() =>
                dispatch(removeFromCart(item.product._id))
              }
            >Remove</button>
          </div>
          <hr/>
          </>
        ))}

      </div>

      {/* RIGHT */}
      <div className="Summary">

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Total Items</span>
            <span>
              {totalQuantity}
            </span>
          </div>
          <div className="summary-row">
            <span>Total Price</span>
            <span>
              ₹{totalPrice}
            </span>
          </div>
        </div>

        <div className="cart-summary">
          <h2>Address</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="fullName"
                value={shippingAddress.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                value={shippingAddress.phone}
                onChange={handleChange}
                placeholder="Enter Phone number"
                required
              />
            </div>

            <div>
              <textarea
                name="address"
                value={shippingAddress.address}
                onChange={handleChange}
                placeholder="Enter your Address"
                required
              />
            </div>

            <div>
              <input
                type="text"
                name="city"
                value={shippingAddress.city}
                onChange={handleChange}
                placeholder="enter Your City"
                required
              />
            </div>

            <div>
              <input
                type="text"
                name="state"
                value={shippingAddress.state}
                onChange={handleChange}
                placeholder="Enter Your State"
                required
              />
            </div>

            <div>
              <input
                type="text"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleChange}
                placeholder="Enter Postal Code"
                required
              />
            </div>

            <div>
              <input
                type="text"
                name="country"
                value={shippingAddress.country}
                onChange={handleChange}
                placeholder="Enter Country"
                required
              />
            </div>

            <button type="submit" className="checkout-btn">
            Proceed To Checkout
            </button>
          </form>
        </div>
      </div>  
    </div>
  );
};

export default Cart;