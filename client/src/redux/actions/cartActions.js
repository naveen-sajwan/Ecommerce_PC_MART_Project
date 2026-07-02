import API from "../../utils/axios";
import {
    setCart,
    setLoading,
    setError,
    clearCart,
    removeCartItem,
    updateCartItem,
} from "../slices/cartSlice.js";

export const fetchCart = () => async(dispatch) => {
    try{
        dispatch(setLoading(true));
        const {data} = await API.get("/cart");
        dispatch(setCart(data.items))
    }catch(error){
        dispatch(setError(
            error.response?.data?.message ||
            error.message
        ));
    }finally{
        dispatch(setLoading(false));
    }
}

export const addToCart = (productId,quantity) => async(dispatch) => {
    try{
        dispatch(setLoading(true));
        const {data} = await API.post(`/cart`,{productId,quantity});
        console.log("Add to Cart Data:", data);
        dispatch(setCart(data.items));
    }catch(error){
        dispatch(setError(
            error.response?.data?.message ||
            error.message
        ));
    }finally{
        dispatch(setLoading(false));
    }
}

export const removeFromCart = (productId) => async(dispatch) => {
    dispatch(removeCartItem(productId));
    try{
        dispatch(setLoading(true));     
        const {data} = await API.delete(`/cart/${productId}`);
    }catch(error){
        dispatch(setError(
            error.response?.data?.message ||
            error.message
        ));
    }finally{
        dispatch(setLoading(false));
    }
}

export const updateCartQuantity = (productId,quantity) => async(dispatch)=>{
    dispatch(updateCartItem({productId, quantity}));
    try{
        const {data} = await API.put(`/cart/${productId}`,{quantity});
    }catch(error){
        dispatch(setError(
            error.response?.data?.message ||
            error.message
        ));
    }
}