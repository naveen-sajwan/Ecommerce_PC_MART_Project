import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="payment-success">
      <div className="payment-success-card">
        <div className="success-icon">✓</div>

        <h1>Payment Successful</h1>

        <p>Your order has been placed successfully.</p>

        <p>Thank you for shopping with us.</p>

        <p className="redirect-text">
          Redirecting to Home Page in <strong>5 seconds...</strong>
        </p>

        <button
          className="home-btn"
          onClick={() => navigate("/")}
        >
          Go Home Now
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;