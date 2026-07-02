import Order from "../models/Order.js"

// Get All Orders
export const getAllOrders = async(req,res)=>{
    try {
        const orders = await Order.find()
            .populate("user","name email")
            .populate("items.product","name")
            .sort({createdAt: -1})
            
        return res.status(200).json(orders)
    }catch(error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}

// Get Orders for Logged-In User
export const getMyOrders = async(req,res)=>{
    try {
        const orders = await Order.find({
            user: req.user._id
        })
            .populate("items.product","name price images")
            .sort({createdAt: -1});

        return res.status(200).json(orders);
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

// Get Order by Order ID
export const getOrdersByID = async(req,res)=>{
    try{
        const order = await Order.findById(req.params.id)
            .populate("items.product");

        if (!order) {
            return res.status(404).json({
                message: "Order not Found",
            });
        }
        return res.status(200).json(order);

    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}


// update Order Status
export const updateOrderStatus = async(req,res)=>{
    try {
        const order = await Order.findById(
            req.params.id
        )

        if(!order){
            return res.status(404).json({
                message: "Order not found",
            });
        }

        order.orderStatus = req.body.orderStatus;

        if(req.body.orderStatus === "delivered"){
            order.deliveredAt = new Date();
        }

        await order.save();
        return res.status(200).json(order);

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}