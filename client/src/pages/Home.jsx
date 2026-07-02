import React from 'react'
import { IoDiamond } from "react-icons/io5";
import slider1 from "../assets/images/zcstock-images-02.webp";
import slider2 from "../assets/images/zcstock-images-03.webp";
import slider3 from "../assets/images/zcstock-images-04.webp";
import slider4 from "../assets/images/zcstock-images-05.webp";
import { useNavigate } from "react-router-dom";
import data from "../data/DataOne.js";

const Home = () => {
    const navigate = useNavigate();
  return (
    <>
    <div className=" home_header_wrapper">
        <div className='header_flex'>
        <div className="inner_header_wrap_one">
            <div>
                <p className='header_para'>Special Discount   <IoDiamond /></p>
                <h1 className='header_h1'>CHOOSE <strong style={{color:"#FFCD6C"}}>PC MART</strong> CHOOSE SAVINGS! UPTO 20% OFF</h1>
                <p className='header_h1'>1.85” AMOLED Display | Premium Metal Build</p>
            </div>
            <div className='Home_header_Button'>
                <button onClick={() => navigate("/products")}>Shop Now</button>
            </div>
        </div>
        
        <div className="inner_header_wrap_two">
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={slider1} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src={slider2} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src={slider3} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src={slider4} className="d-block w-100" alt="..."/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        </div>
    </div>

    <div className="container p-5 category_section">
        <div>
            <p style={{
                color:'#111',
                fontWeight:"700",
                fontSize: "30px"
            }}>Shop by Categories</p>
        </div>
        <div>
            <div className="categoriy_wrapper">
                {data.map((item)=>{
                    return(
                        <div key={item.id} className="inner_list" style={{backgroundColor:item.color_code}}>
                            <img src={item.image} alt={item.name} /><br/>
                            <p className='text-center'>{item.name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
    
    <div className="home_thirdSection container">
        <div className="inner_header_wrap_one home_thirdSection_inner">
            <div>
                <div>
                    <p className='header_para'>Go Anywhere, Pro Everything Starting At Just 9,999 <IoDiamond /></p>
                    <h1 className='header_h1'>Save Up To 60%</h1>
                </div>
                <div className='Home_header_Button'>
                    <button onClick={() => navigate("/products")}>Shop Now</button>
                </div>
            </div>
            <div className='third_section_blank_width'>none</div>
        </div>
    </div>


    </>
  )
}

export default Home