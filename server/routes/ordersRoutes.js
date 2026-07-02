import express from "express"

import{
    getAllOrders,
    updateOrderStatus,
    getMyOrders,
    getOrdersByID,
} from "../controllers/ordersControllers.js";
import {admin} from "../middlewares/adminMiddleware.js";
import {protect} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
    .get(protect, admin, getAllOrders);

router.route("/my-orders")
    .get(protect, getMyOrders);

router.route("/:id")
    .put(protect,admin,updateOrderStatus)
    .get(protect,getOrdersByID)

export default router;
