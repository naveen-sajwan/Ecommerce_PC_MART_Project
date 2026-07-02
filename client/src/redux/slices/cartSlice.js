import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cartItems:[],
    loading:false,
    error:null,
    totalQuantity:0,
    totalPrice:0,
};

const calculateTotals = (cartItems)=>{
    let totalQuantity = 0;
    let totalPrice = 0;

    cartItems.forEach(item=>{
        totalQuantity += item.quantity;
        totalPrice += item.quantity * item.product.price;
    })
    return {
        totalQuantity,
         totalPrice,
    };
};

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        // Loading
        setLoading: (state,action)=>{
            state.loading = action.payload;
        },

        //Error
        setError: (state,action)=>{
            state.error = action.payload;
        },

        // Set Cart
        setCart: (state, action) => {
            console.log("Redux Payload:", action.payload);

            state.cartItems = action.payload;

            const totals = calculateTotals(state.cartItems);
            state.totalQuantity = totals.totalQuantity;
            state.totalPrice = totals.totalPrice;
        },
        removeCartItem: (state,action)=>{
            state.cartItems = state.cartItems.filter(
                item => item.product._id !== action.payload
            );
            const totals = calculateTotals(state.cartItems);
            state.totalQuantity = totals.totalQuantity;
            state.totalPrice = totals.totalPrice;
        },
        // Update Cart Quantity
        updateCartItem: (state, action) => {
            const { productId, quantity } = action.payload;
            const itemIndex = state.cartItems.findIndex(
                    (item) => item.product._id === productId
                );
                if (itemIndex !== -1) {
                    state.cartItems[itemIndex].quantity = quantity;
                }
                const totals = calculateTotals(state.cartItems);
                state.totalQuantity = totals.totalQuantity;
                state.totalPrice = totals.totalPrice;
            },      

        // Clear Cart

        clearCart: (state)=>{
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
            state.error = null;
        },
    },
});

export const {setLoading,setError,setCart,removeCartItem,updateCartItem,clearCart} = cartSlice.actions;
export default cartSlice.reducer;
