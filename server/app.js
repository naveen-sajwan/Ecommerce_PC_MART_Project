import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dbcon from "./config/db.js";
import productRoutes from "./routes/productRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import wishlistRoutes from "./routes/wishlistRoutes.js";
import myMailRoutes from "./routes/myMailRoutes.js"
import cartRoutes from "./routes/cartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";

dotenv.config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Db connection
dbcon();

app.use("/api",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/wishlist",wishlistRoutes);
app.use("/api/contact",myMailRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/payment",paymentRoutes);
app.use("/api/orders",ordersRoutes);

export default app;