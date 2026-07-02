import React,{useState,useEffect} from 'react'
import axios from "axios";
import { toast } from 'react-toastify';
import {useDispatch} from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import {Link,useNavigate} from "react-router-dom"

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [loading,setLoading] = useState(false);
  
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const {email,password} = loginForm;
    if(!email || !password){
      setError("Please Fill in all Fields")
      return;
    }
    setError("");
    setLoading(true)
    try {
      const response = await API.post(`/login`,loginForm,{withCredentials: true});
      console.log(response.data)
      if(response.data.message === "Signed-In Successfully"){
        const user = response.data.user;
        toast.success(response.data.message);
        dispatch(setUser(user));
        setLoginForm({
          email:"",
          password:""
        })
        if(user.role === "admin"){
          history("/admin");
        }else{
          history("/public");
        }
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Login Failed. Please Try Again.");
    }
    setLoading(false);
  }
  
  const handleChange = (e)=>{
    setLoginForm({...loginForm,[e.target.name]:e.target.value})
  }

  return (
    <>
    <div className="login_outerWrapper">
      <div className="login_innerWrapper_one">
        <form onSubmit={handleSubmit}>
          <h2 style={{ color:"#f0c87c",letterSpacing:"10px"}}>Login</h2>
          <input type="text" onChange={handleChange} value={loginForm.email} name="email" placeholder='xyz@gmail.com' required/>
          <input type="password" onChange={handleChange} value={loginForm.password} name="password" placeholder='Enter your Password' required/>
          <div className='login_button_wrapper'>
            <button className="login_btn" type='submit'>Submit</button><br/><br/>
            <p>Don't Have an Account?
              <Link className='link' to="/register">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
      <div className="login_innerWrapper_two">
        <div className="login_bottom_container">
          <p>" <strong>Quality</strong> You Can Trust.  <strong>Performance</strong> You Can Feel."</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login;