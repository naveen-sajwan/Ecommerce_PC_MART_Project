import React from 'react'
import contactForm_image from "../assets/images/contactForm_image.avif"
import { useState } from 'react';
import {toast} from "react-toastify";
import API from "../utils/axios.js";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { motion } from "motion/react"

const ContactUs = () => {
    const [inputs, setInputs] = useState({
        name:"",
        email:"",
        message:"",
    });

    const [loading,setLoading] = useState(false);

    const handleChange = (e) => {
        const {name,value} = e.target;
        setInputs({...inputs,[name]:value})
    };

    const submit = async(e) => {
        setLoading(true);
        e.preventDefault()
        
        // fields Valdation
        if(!inputs.name || !inputs.email || !inputs.message){
            toast.error("Please Fill all input fields");
            setLoading(false);
            return;
        }

        try {
            await API.post(`/contact/sendMail`,inputs)
            .then((response)=>{
                if(response.data.msg==="Email Sent Successfully"){
                    toast.success(response.data.msg);
                    return setInputs({
                        name:"",
                        email:"",
                        message:"",
                    })
                }else{
                    return toast.error(response.data.msg);
                }
            })
        } catch (error) {
            console.error("Something Went Wrong");
        }finally{
            setLoading(false);
        }
    }

  return (
    <>
        <div className="aboutUs_outerWrapper">
            <div className="contactUs_firstSection">
                <div className="aboutUs_heroContainer">
                    <p>Contact-Us</p>
                </div>
            </div>
            <div className='container contact_form_wrapper'>
                <div className="contact_image">
                    <LazyLoadImage
                		alt="team_image"
                		effect="blur"
                		wrapperProps={{
                			style: {transitionDelay: "0.7s"},
                		}}
                		src={contactForm_image}
                        id='contactPic' 
              		/>
                </div>
                <div className="contact_form">
                    <form className='form_wrapper'>
                        <h1>CONTACT US FORM....</h1>
                        <input type="text" name="name" onChange={handleChange} value={inputs.name} placeholder='Enter Your Name...' required/>
                        <input type="email" name="email" id="email" onChange={handleChange} value={inputs.email} placeholder='Enter Your Email...' required/>
                        <textarea name="message" id="" cols="30" rows="9" onChange={handleChange} value={inputs.message} placeholder='message' required></textarea>
                        <motion.button 
                            id="contact_submit_btn" 
                            onClick={submit}
                            type="submit"
                            whileHover={{ scale: 1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {loading ? "Submitting...":"Submit"}
                        </motion.button>
                    </form>
                </div>
            </div>
            <div className='google_map_container'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11972.024705827956!2d77.04466223486676!3d28.7292873745423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d06577f8887a1%3A0x8aa1d987c33c413!2sSector%2038%2C%20Rohini%2C%20Delhi!5e1!3m2!1sen!2sin!4v1781962432089!5m2!1sen!2sin" width="1080" height="300" allowFullScreen="true" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    </>
  )
}

export default ContactUs