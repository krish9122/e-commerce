import asyncHandler from "../utils/asyncHandlers.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";

const getAdminStatus = asyncHandler(async (req, res) => {
    const totalOrders = await Order.countDocuments({});
    const totalUsers = await User.countDocuments({});
    const totalProducts = await Product.countDocuments({});

    const orders = await Order.find({});
    const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

    return res.status(200).json(
        new ApiResponse(
            200,
            { totalOrders, totalUsers, totalProducts, totalRevenue },
            "Admin status fetched successfully"
        )
    );
});

export { getAdminStatus };