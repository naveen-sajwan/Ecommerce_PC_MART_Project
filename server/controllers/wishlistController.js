import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";
// Get Wishlist

export const getWishlist = async(req,res)=>{
    try{
        const wishlist = await  Wishlist.findOne({
            user: req.user._id,
        }).populate("products");

        if(!wishlist){
            return res.status(200).json({
                products: [],
            });
        };
        return res.status(200).json(wishlist);
    }catch(error){
        return res.status(500).json({
            message: error.message,
        });
    }
}


// Add to wishlist 

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    // Validate productId
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // Check product exists
    const productExists = await Product.findById(productId);

    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find user wishlist
    let wishlist = await Wishlist.findOne({
      user: req.user._id,
    });

    // Create wishlist if not exists
    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: [productId],
      });

      await wishlist.populate("products");

      return res.status(201).json({
        success: true,
        message: "Product added to wishlist",
        wishlist,
      });
    }

    // Check duplicate product
    const alreadyExists = wishlist.products.some(
      (item) => item.toString() === productId
    );

    if (alreadyExists) {
      return res.status(409).json({
        success: false,
        message: "Product already in wishlist",
      });
    }

    // Add product
    wishlist.products.push(productId);

    await wishlist.save();

    // Populate products
    await wishlist.populate("products");

    return res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      wishlist,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Remove From Wishlist

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({
      user: req.user._id,
    });

    if (!wishlist) {
      return res.status(404).json({
        message: "Wishlist not found",
      });
    }

    wishlist.products = wishlist.products.filter(
      (item) => item.toString() !== productId
    );

    await wishlist.save();

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};