
import { verifyJWT } from "../middlewares/auth.mliddleware.js";
import { Router } from "express";
import admin from "../middlewares/admin.middleware.js";
import { getAdminStatus } from "../controllers/analytics.controller.js";

const analyticsRouter = Router();

analyticsRouter.route("/").get(verifyJWT, admin, getAdminStatus);

export default analyticsRouter;