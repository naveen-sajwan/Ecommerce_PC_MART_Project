import { useState } from "react";
import { useDispatch,useSelector } from 'react-redux';
import axios from "axios";
import "./Account.css";
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa";

const Public_myAccount = () => {

  const { user } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  }); 
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const togglePassword = (field)=>{
    setShowPassword((prev)=> ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/change-password`,
        formData,{
          withCredentials: true,
        });
      
        console.log(response.data);
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
    } catch (error) {
      console.error("Error is :",error);
    }
  };

  return (
    <div className="account-page">
      <div className="account-container">

        <h1 className="account-heading">My Account</h1>

        {/* User Information */}
        <div className="account-card">

          <h2 className="card-title">Account Information</h2>

          <div className="user-info">

            <div className="info-box">
              <label>Full Name</label>
              <p>{user.name}</p>
            </div>

            <div className="info-box">
              <label>Email</label>
              <p>{user.email}</p>
            </div>

            <div className="info-box">
              <label>Role</label>
              <p>{user.role}</p>
            </div>

          </div>
        </div>

        {/* Change Password */}
        <div className="account-card">

          <h2 className="card-title">Change Password</h2>

          <form className="password-form" onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Current Password</label>

              <input
                type={showPassword.current ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
              />
              <span
                className="eye-icon"
                onClick={()=> togglePassword("current")}
              >
                 {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>

            <div className="form-group">
              <label>New Password</label>

              <input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
              />
              <span
                className="eye-icon"
                onClick={()=> togglePassword("new")}
              >
                 {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>

              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
              />
              <span
                className="eye-icon"
                onClick={()=> togglePassword("confirm")}
              >
                 {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>

            <button className="update-btn" type="submit">
              Update Password
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};

export default Public_myAccount;