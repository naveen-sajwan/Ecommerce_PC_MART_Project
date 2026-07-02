import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middlewares/authMiddleware.js"
import { admin } from "../middlewares/adminMiddleware.js"

const router = express.Router();

router.route("/")
  .get(getProducts)
  .post(protect,admin,upload.array("images", 5), createProduct);

router.route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);


export default router;