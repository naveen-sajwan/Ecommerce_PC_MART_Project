import React,{useState,useEffect} from 'react'
import { useParams } from "react-router-dom";
import API from "../../utils/axios.js";

const Public_getSingleOrder = () => {
    const [order,setOrders] = useState(null);
    const [loading,setLoading] = useState(true);
    
    const { id } = useParams(); 

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await API.get(`/orders/${id}`);
                setOrders(data);
                console.log(data)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [id]);

    if(!order){
        return <div>Order Not Found</div>
    }

    if (loading) {
        return <h2>Loading Orders...</h2>;
    }

  return (
    <>
        <div className="Order_main">
            <div className="Order_details">
                <div className="Order_details_inner">
                    <h2>Order Details</h2>
                    <hr/>
                    <p>Order ID: {order._id}</p>
                    <p>Total Amount: ₹{order.totalAmount}</p>
                    <p>Payment Status: {order.paymentStatus}</p>
                    <p>Order Status: {order.orderStatus}</p>
                </div>

                <div className="Order_details_inner">
                    <h2>Shipping Address</h2>
                    <hr/>
                    <p>Address: {order.shippingAddress.address}</p>
                    <p>City: {order.shippingAddress.city}</p>
                    <p>Country: {order.shippingAddress.country}</p>
                    <p>Full Name: {order.shippingAddress.fullName}</p>
                    <p>phone: {order.shippingAddress.phone}</p>
                    <p>Postal Code: {order.shippingAddress.postalCode}</p>
                    <p>State: {order.shippingAddress.state}</p>
                </div>
            </div>
            <div className='aside_height'>
                <div className='aside'>
                    <h2>Products</h2>
                    <hr/>
                        <div>
                            {order.items.map((item)=>{
                                return(
                                    <div className='inner_Aside_items' key={item._id}>
                                        <div className='d-flex'>
                                            <div className='product_image_container'>
                                                <img src={item.product.images[0].url} alt={item.product.name} title={item.product.name}/>
                                            </div>
                                            <div className='product_details'>
                                                <p>{item.product.name.substr(0,32)}...</p>
                                                <p>{item.product.category}</p>
                                            </div>
                                        </div>
                                        <div className='total_order_Amount'>
                                            <p style={{margin:"0"}}>₹{item.product.price}</p>
                                            <p>Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    <hr/>
                    <div className='Total_amount d-flex justify-content-between'>
                        <h2>Total Amount : </h2>
                        <h2>₹ {order.totalAmount}</h2>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Public_getSingleOrder