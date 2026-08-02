import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandlers.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import sendMail from "../utils/mailsender.js";

// method to generate access and refresh tokens
const generateAccessAndRefreshTokens = async (userId) => {
    const user = await User.findById(userId);
    const accessTokens = user.generateAccessTokens();
    const refreshTokens = user.generateRefreshTokens();

    user.refreshToken = refreshTokens;
    await user.save({ validateBeforeSave: false });

    return { accessTokens, refreshTokens };
};
/////////////////////////////////////////register user//////////////////////////////////////
const registerUser = asyncHandler(async(req,res)=>{

    //fetching data from user
    const {name,email,password,phone_no} = req.body;

    //validation
    if(!name || !email || !password || !phone_no) {
        throw new ApiError(400, "All fields are required")
    }

    //checking if user already exists
    const existingUser = await User.findOne({$or:[{phone_no},{email}]}).select("-password")
    if(existingUser){
        throw new ApiError(409, "User already exists")
    }

    //creating db entry
    const user = await User.create({
        name,
        email,
        password,
        phone_no,
        role:role.user
    })

     //removing password and refresh tokens from response
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    //checking user created or not
    if (!createdUser) {
        throw new ApiError(500, "something went wrong while regrestring a user")
    }

    //response to user by mail
    const mailResult = await sendMail(
        "Welcome to Our App",
        `Hi ${createdUser.name},\n\nWelcome to our app! We're excited to have you on board.`,
        process.env.GMAIL,
        createdUser.email
    );
    if (!mailResult) {
        throw new ApiError(500, "Failed to send welcome email");
    }

    //user respomse
    return res.status(201).json(
        new ApiResponse(200, createdUser, "created User created successfully")
    )
    });

    /////////////////////////////login user///////////////////////////////
    const loginUser = asyncHandler(async(req,res)=>{

        //fetching data from user
        const {email,password} = req.body;

        //validation
        if(!email || !password) {
            throw new ApiError(400, "All fields are required")
        }

        //checking if user exists
        const user = await User.findOne({$or:[{email},{phone_no}]}).select("-refreshToken -password")

        if(!user){
            throw new ApiError(404, "User not found")
        }

        //checking if password is correct
        const isPasswordCorrect = await user.isPasswordCorrect(password)
        if(!isPasswordCorrect){
            throw new ApiError(401, "Invalid password")
        }

        //generating access and refresh tokens
        const { accessTokens, refreshTokens } = await generateAccessAndRefreshTokens(user._id).select("-password -refreshToken")

        const options = {
            httpOnly: true,
            secure: true
        };
        return res.
        status(200)
        .cookie("accessTokens", accessTokens, options)
        .cookie("refreshTokens", refreshTokens, options)
        .json(new ApiResponse(200, { user, accessTokens, refreshTokens }, "User logged in successfully"));
 
    });

    ////////////////getting user profile/////////////////////
    const getUserProfile = asyncHandler(async(req,res)=>{
        const userId = req.user._id;
        const user = await User.findById(userId).select("-password -refreshToken");
        return res.status(200).json(new ApiResponse(200, user, "User profile retrieved successfully"));
    });

    /////////////////////userlogout/////////////////////////
    const loggedOut = asyncHandler(async (req, res) => {
    // 1. get user id from req.user._id and set refresh token to empty string in db
    await User.findByIdAndUpdate(req.user._id, {
        $set: { refreshToken: "" },
    }, {
        new: true,// to return the updated user document after the update operation is applied.

    })
    const options = { // options for clearing cookies
        httpOnly: true,
        secure: true,
    }
    return res
        .status(200)
        .cookie("refreshTokens", options)
        .cookie("accessTokens", options)
        .json(new ApiResponse(200, {}, "user logged out successfully"))
})

/////////////////////// access tokens and refresh tokens ////////////////////////
const refreshTokens = asyncHandler(async (req, res) => {

    // 1. get refresh token from cookies or request body   
    const incomingRefreshToken = req.cookies?.refreshTokens || req.body?.refreshTokens;

    // 2. validate refresh token
    if (!incomingRefreshToken) { throw new ApiError(401, "Unauthorized: No refresh token provided") }

    try {

        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        if (!decodedToken) {
            throw new ApiError(401, "Unauthorized: Invalid refresh token")
        }

        const user = await User.findById(decodedToken?._id)


        if (!user) {
            throw new ApiError(401, "Unauthorized: Invalid refresh token")
        }

        if (user.refreshToken !== incomingRefreshToken) {
            throw new ApiError(401, "Unauthorized: token is expired or invalid")
        }

        const { newRefreshToken, accessTokens } = generateAccessAndRefreshTokens(user._id)

        const option =
        {
            httpOnly: true,
            secure: true
        }

        return res.
            status(200)
            .cookie("refreshTokens", newRefreshTokens, options)
            .cookie("accessTokens", accessTokens, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        "refreshTokens": newRefreshTokens,
                        "accessTokens": accessTokens,
                    },
                    "refreshToken and accessToken send successfully"
                )
            )


    } catch (error) {
        throw new ApiError(400, error?.message || "invalid request")
    }
})

    export { registerUser, loginUser, generateAccessAndRefreshTokens, getUserProfile, loggedOut, refreshTokens };