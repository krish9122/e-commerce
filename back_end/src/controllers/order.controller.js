import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandlers.js";
import sendMail from "../utils/mailsender.js";

///////////////////////creating order/////////////////////
const createOrder = asyncHandler(async (req, res) => {
    const { products, paymentId, totalAmount, address } = req.body;

    //validation
    if(!products || products.length === 0 || !totalAmount || !address){
        throw new ApiError(400, "All fields (products, totalAmount, address) are required");
    } 

    const finalPaymentId = paymentId || "COD-" + Date.now();

    // Create a new order
    const order = await Order.create({
        user: req.user._id,
        products,
        totalAmount,
        address,
        paymentId: finalPaymentId
    });

    try {
        await sendMail(
            "Order Confirmation", 
            `Dear ${req.user.name},\n\nYour order has been placed successfully.\nOrder ID: ${order._id}\nTotal Amount: ₹${totalAmount}.\n\nThank you for shopping with us!`,
            process.env.GMAIL,
            req.user.email
        );
    } catch (mailError) {
        console.error("Order confirmation email failed to send:", mailError.message);
    }

    return res.status(201).json(new ApiResponse(201, order, "Order created successfully"));
});

/////////////////////getting order by id/////////////////////
const getOrderById = asyncHandler(async (req, res) => {
    // Fetch the order by ID
    const order = await Order.findById(req.params.id)
        .populate("user", "name email phone_no")
        .populate("products.productId", "name price imageUrl");

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    return res.status(200).json(new ApiResponse(200, order, "Order fetched successfully"));
});

/////////////////////getting all orders for the authenticated user/////////////////////
const getMyOrderById = asyncHandler(async (req, res) => {
    // Fetch orders for the authenticated user
    const orders = await Order.find({ user: req.user._id })
        .populate("products.productId", "name price imageUrl")
        .sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, orders, "My orders fetched successfully"));
});

////////////////gettig all orders for admin/////////////////////
const getAllOrders = asyncHandler(async (req, res) => {
    // Fetch all orders (admin only)
    const orders = await Order.find({})
        .populate("user", "name email phone_no")
        .populate("products.productId", "name price imageUrl")
        .sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, orders, "All orders fetched successfully"));
});

/////////////////update order status/////////////////////
const updateOrder = asyncHandler(async (req, res) => {
    // Extract the status from the request body
    const { status } = req.body;

    // Validate status
    if (!status) {
        throw new ApiError(400, "Invalid status value");
    }

    // Find the order by ID
    const order = await Order.findById(req.params.id);
    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    order.status = status;
    await order.save();

    try {
        const user = await User.findById(order.user);
        if (user) {
            await sendMail(
                `Order Status Updated: ${status}`,
                `Dear ${user.name},\n\nYour order #${order._id} status has been updated to: ${status.toUpperCase()}.\n\nThank you for shopping with us!`,
                process.env.GMAIL,
                user.email
            );
        }
    } catch (mailError) {
        console.error("Order status update email failed to send:", mailError.message);
    }

    return res.status(200).json(new ApiResponse(200, order, "Order status updated successfully"));
});

export { createOrder, getAllOrders, getMyOrderById, updateOrder, getOrderById };