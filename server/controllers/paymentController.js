import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

export const createOrder = async(req,res)=>{
    try {

        const cart = await Cart.findOne({
            user: req.user._id,
        }).populate("items.product");

        if(!cart || cart.items.length === 0){
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        const totalAmount = cart.items.reduce(
            (total,item)=> total + item.product.price * item.quantity,0
        );

        const razorpayOrder = await razorpay.orders.create({
            amount: totalAmount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        })
        
        const order = await Order.create({
            user: req.user._id,

            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price,
            })),

            totalAmount,
            shippingAddress: req.body.shippingAddress,
            paymentStatus: "pending",
            razorpayOrderId: razorpayOrder.id,
        });

        res.status(200).json({
            orderId: order._id,
            razorpayOrder,
        })

    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

export const verifyPayment = async(req,res)=>{
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        const generatedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET,
            )
            .update(
                razorpay_order_id + "|" + razorpay_payment_id
            )
            .digest("hex");
        
        if(generatedSignature !== razorpay_signature){
            return res.status(400).json({
                success: false,
                message: "Payment Verification Failed",
            });
        }

        const existingOrder = await Order.findOne({
            razorpayOrderId: razorpay_order_id
        });

        if(!existingOrder){
            return res.status(404).json({
                message: "Order not Found",
            });
        }

        existingOrder.paymentStatus = "paid";
        existingOrder.razorpayPaymentId = razorpay_payment_id;
        existingOrder.orderStatus = "processing";
        await existingOrder.save();

        await Cart.findOneAndUpdate(
            {
                user: existingOrder.user,
            },{
                items: [],
            }
        );

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
        })
    } catch (error){
        return res.status(500).json({message: error.message})
    }
}
