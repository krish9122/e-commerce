import { Router } from "express";
import {
     registerUser,
    loginUser,
    loggedOut,
    getUserProfile,
    refreshTokens,
} from "../controllers/user.controller.js"
import admin from "../middlewares/admin.middleware.js";
import { verifyJWT } from "../middlewares/auth.mliddleware.js";

const userRouter = Router()

userRouter.route("/register").post(registerUser)
userRouter.route("/loginUser").post(loginUser)
userRouter.route("/getUserProfile").get(verifyJWT,admin,getUserProfile)
userRouter.route("/logoutUser").post(verifyJWT,loggedOut)
userRouter.route("/refreshTokens").post(refreshTokens)

export default userRouter;  