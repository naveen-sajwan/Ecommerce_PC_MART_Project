import Product from "../models/Product.js";
import cloudinary,{ uploadBuffer } from "../config/cloudinary.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    // 1. Extract query params
    const {
      keyword,
      category,
      min,
      max,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    // 2. Build query object
    let query = {};

    // 🔍 Search (name)
    if (keyword) {
      query.name = { $regex: keyword, $options: "i" };
    }

    // 🏷️ Category filter
    if (category) {
      query.category = category;
    }

    // 💰 Price range
    if (min || max) {
      query.price = {};
      if (min) query.price.$gte = Number(min);
      if (max) query.price.$lte = Number(max);
    }

    // 3. Create base query
    let productsQuery = Product.find(query);

    // 4. Sorting
    if (sort) {
      const sortOption = sort === "price" ? { price: 1 } :
                         sort === "-price" ? { price: -1 } :
                         sort === "rating" ? { averageRating: -1 } :
                         {};

      productsQuery = productsQuery.sort(sortOption);
    }

    // 5. Pagination
    const skip = (page - 1) * limit;

    productsQuery = productsQuery
      .skip(skip)
      .limit(Number(limit));

    // 6. Execute query
    const products = await productsQuery;

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Get single product
export const getProductById = async (req,res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product){
      return res.status(404).json({ message: "Product not found" });
    }
      
      return res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create product (Admin)
export const createProduct = async (req, res) => {
  try{
    let images = [];
    for(const file of req.files){
      const result = await uploadBuffer(file.buffer);
      images.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
      
    }

    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
      images,
    });

    return res.status(201).json(product);
  }catch(error){
    return res.status(500).json({message: error.message});
  }
};

// Update product
export const updateProduct = async(req,res)=>{
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if(!product){
            return res.status(404).json({message:"Product Not Found!"});
        }

        res.json(product);
        console.log(product);

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}


// Delete product
export const deleteProduct = async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
          return res.status(404).json({message:"Product Not Found!"});
        }
        // Delete images from Cloudinary
        for(const image of product.images){
          await cloudinary.uploader.destroy(
            image.public_id
          );
        }

        // Delete product from MongoDB
        await product.deleteOne();
        
        return res.status(200).json({message: "Product removed" }); 
    }catch (error) {
        return res.status(500).json({message: error.message});
    }
}