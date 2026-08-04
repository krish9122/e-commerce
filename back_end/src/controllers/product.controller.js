import asyncHandler from "../utils/asyncHandlers.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";
import { UploadOnClouddinary } from "../utils/cloudinary.js";

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    return res.status(200).json(new ApiResponse(200, products, "All products fetched successfully"));
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return res.status(200).json(new ApiResponse(200, product, "Product fetched successfully"));
});

const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category, stock } = req.body;

    if (!name || !description || price === undefined || !category || stock === undefined) {
        throw new ApiError(400, "All fields are required");
    }

    let imageUrl = "";
    if (req.file) {
        const uploadedImage = await UploadOnClouddinary(req.file.path);
        imageUrl = uploadedImage?.secure_url || "";
    }

    const product = await Product.create({
        name,
        description,
        price,
        category,
        stock,
        imageUrl,
    });

    if (!product) {
        throw new ApiError(400, "Product creation failed");
    }

    return res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
});

const updateProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category, stock } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    let imageUrl = product.imageUrl;
    if (req.file) {
        const uploadedImage = await UploadOnClouddinary(req.file.path);
        imageUrl = uploadedImage?.secure_url || product.imageUrl;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: name || product.name,
            description: description || product.description,
            price: price ?? product.price,
            category: category || product.category,
            stock: stock ?? product.stock,
            imageUrl,
        },
        { new: true }
    );

    return res.status(200).json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

const deleteProductId = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json(new ApiResponse(200, null, "Product deleted successfully"));
});

export { getProducts, getProductById, createProduct, updateProduct, deleteProductId };