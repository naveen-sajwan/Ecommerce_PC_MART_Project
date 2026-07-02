import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

//Get Cart
export const getCart = async (req, res) => {
    try {

        const cart = await Cart.findOne({
            user: req.user._id,
        }).populate("items.product");

        if (!cart) {
            return res.status(200).json({
                items: [],
            });
        }
        return res.status(200).json(cart);

    } catch (error) {

        return res.status(500).json({
            message: error.message,
        });
    }
};

// Add to Cart
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        
        // ✅ Validation
        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }
        
        const quantityNum = parseInt(quantity);
        if (isNaN(quantityNum) || quantityNum <= 0) {
            return res.status(400).json({ message: "Quantity must be a positive number" });
        }
        
        // ✅ Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        // ✅ Check stock
        if (product.stock < quantityNum) {
            return res.status(400).json({ 
                message: `Only ${product.stock} items available` 
            });
        }
        
        // ✅ Find cart
        let cart = await Cart.findOne({ user: req.user._id });
        
        if (!cart) {
            // Create new cart
            cart = await Cart.create({
                user: req.user._id,
                items: [{ product: productId, quantity: quantityNum }],
            });
        } else {
            // Check if product already in cart
            const itemIndex = cart.items.findIndex(
                (i) => i.product.toString() === productId
            );
            
            if (itemIndex > -1) {
                // Update existing item
                const newQuantity = cart.items[itemIndex].quantity + quantityNum;
                
                // Check stock for updated quantity
                if (product.stock < newQuantity) {
                    return res.status(400).json({ 
                        message: `Cannot add ${quantityNum}. Only ${product.stock - cart.items[itemIndex].quantity} available` 
                    });
                }
                
                cart.items[itemIndex].quantity = newQuantity;
            } else {
                // Add new item
                cart.items.push({ product: productId, quantity: quantityNum });
            }
            
            // ✅ Save cart (THIS WAS MISSING IN YOUR CODE FOR UPDATE PATH)
            await cart.save();
        }
        
        // ✅ Populate product details before sending
        const populatedCart = await Cart.findById(cart._id)
            .populate("items.product");
        
        // ✅ Send response
        res.status(200).json({
            success: true,
            message: "Item added to cart",
            cart: populatedCart
        });
        
    } catch (error) {
        // ✅ Error handling
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};

// Remove Cart item
export const removeFromCart = async(req,res)=>{
    try {
        const { productId } = req.params;
        const cart = await Cart.findOne({user: req.user._id});

        if(!cart){
            return res.status(404).json({message: "Cart not found"});
        }

        // Filter out the Product
        cart.items = cart.items.filter((item)=>{
            return item.product.toString() !== productId;
        });
        await cart.save();

        const updatedCart = await cart.populate("items.product");
        return res.status(200).json({
            message: "product removed from the cart",
            updatedCart,
        })

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

// Update Cart Quantity

export const updateCartQuantity = async(req,res)=>{
    try{
        const {productId} = req.params;
        const {quantity} = req.body;

        const quantityNum = parseInt(quantity);

        if(isNaN(quantityNum) || quantityNum <=0){
            return res.status(400).json({ message: "Quantity must be a positive number" });
        }

        const cart = await Cart.findOne({user: req.user._id})
        if(!cart){
            return res.status(404).json({ message: "Cart not Found" })
        }

        const itemIndex = cart.items.findIndex((item) =>
            item.product.toString() === productId
        );

        if(itemIndex === -1){
            return res.status(404).json({message: "Product Not found in the cart"})
        }

        //check stock
        const product = await Product.findById(productId)

        if(!product){
            return res.status(404).json({message: "Product Not Found"});
        }

        if(quantityNum > product.stock){
            return res.status(400).json({
                message: `Only ${product.stock} items available`,
            })
        }

        cart.items[itemIndex].quantity = quantityNum;
        await cart.save();

        const updatedCart =
            await Cart.findById(cart._id)
                .populate("items.product");

        return res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cart: updatedCart,
        }); 
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}







