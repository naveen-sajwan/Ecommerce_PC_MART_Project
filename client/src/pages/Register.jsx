import React,{useState,useEffect} from 'react'
import axios from "axios";
import { toast } from 'react-toastify';

const Register = () => {

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:"",
  });
  const [error, setError] = useState("");

  const handleSubmit= async(e)=>{
    e.preventDefault();
    // Check if all fields are filled
    const {name,email,password} = formData;

    if(!name || !email || !password){
      setError("Please Fill in all Fields");
      return toast.error(error);
    }

    //clear any previous error
    setError("")

    try {
      const response = await axios.post(`http://localhost:5000/api/register`,formData);
      console.log(response.data);
      if(response.data.message === "User Created"){
        return toast.success(response.data.message);
      }else{
        return toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error: ",error);
    }
  }
    const handleChange= (e)=>{
      setFormData({...formData,[e.target.name]:e.target.value});
    }

  return (
    <>
    <div className="login_outerWrapper">
        <div className="login_innerWrapper_two">
        <div className="login_bottom_container">
          <p>" <strong>Quality</strong> You Can Trust.  <strong>Performance</strong> You Can Feel."</p>
        </div>
      </div>
      <div className="login_innerWrapper_one">
        <form onSubmit={handleSubmit}>
          <h2 style={{ color:"#f0c87c",letterSpacing:"10px"}}>Register</h2>
          <input type="text" onChange={handleChange} value={formData.name}  name="name" placeholder='Enter Your Name...'/>
          <input type="email" onChange={handleChange} value={formData.email} name="email" placeholder='xyz@gmail.com'/>
          <input type="password" onChange={handleChange} value={formData.password} name="password" placeholder='Enter your Password'/>
          <div className='login_button_wrapper'>
            <button className="login_btn" type='submit'>Submit</button><br/><br/>
          </div>
        </form>
      </div>

    </div>
    </>
  )
}

export default Register;