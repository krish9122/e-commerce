import { verifyJWT } from "../middlewares/auth.mliddleware.js";
import { Router } from "express";
import admin from "../middlewares/admin.middleware.js";
import { createOrder, updateOrder, getOrderById, getAllOrders, getMyOrderById } from "../controllers/order.controller.js";

const orderRouter = Router();

//all orders
orderRouter.route("/").get(verifyJWT, admin, getAllOrders).post(verifyJWT, createOrder);

orderRouter.route("/myorder").get(verifyJWT, getMyOrderById);

orderRouter.route("/:id/status").put(verifyJWT, admin, updateOrder);

export default orderRouter;