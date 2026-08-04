import { Router } from "express";
import admin from "../middlewares/admin.middleware.js";
import { verifyJWT } from "../middlewares/auth.mliddleware.js";
import {
  createProduct,
  getProducts,
  getProductById,
  deleteProductId,
  updateProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const productRouter = Router();

productRouter
  .route("/")
  .get(getProducts)
  .post(verifyJWT, admin, upload.single("image"), createProduct);

productRouter
  .route("/:id")
  .get(getProductById)
  .delete(verifyJWT, admin, deleteProductId)
  .put(verifyJWT, admin, upload.single("image"), updateProduct);

export default productRouter;