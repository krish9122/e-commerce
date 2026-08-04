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
    const {name,email,password,phone_no,role} = req.body;

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
        role: role || "user"
    })

     //removing password and refresh tokens from response
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    //checking user created or not
    if (!createdUser) {
        throw new ApiError(500, "something went wrong while regrestring a user")
    }

    //response to user by mail (graceful fallback if mail configuration is missing or invalid)
    try {
        await sendMail(
            "Welcome to Our App",
            `Hi ${createdUser.name},\n\nWelcome to our app! We're excited to have you on board.`,
            process.env.GMAIL,
            createdUser.email
        );
    } catch (mailError) {
        console.error("Welcome email failed to send:", mailError.message);
    }

    //user response
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User created successfully")
    )
});

/////////////////////////////login user///////////////////////////////
const loginUser = asyncHandler(async(req,res)=>{

    //fetching data from user
    const {email, phone_no, password} = req.body;

    //validation
    if((!email && !phone_no) || !password) {
        throw new ApiError(400, "Email/Phone and password are required")
    }

    //checking if user exists
    const query = {};
    if (email) query.email = email;
    if (phone_no) query.phone_no = phone_no;

    const user = await User.findOne(query);

    if(!user){
        throw new ApiError(404, "User not found")
    }

    //checking if password is correct
    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if(!isPasswordCorrect){
        throw new ApiError(401, "Invalid password")
    }

    //generating access and refresh tokens
    const { accessTokens, refreshTokens } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: false // set to false for local development to allow cookie setting over HTTP
    };

    return res.
    status(200)
    .cookie("accessTokens", accessTokens, options)
    .cookie("refreshTokens", refreshTokens, options)
    .json(new ApiResponse(200, { user: loggedInUser, accessTokens, refreshTokens }, "User logged in successfully"));
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
        secure: false,
    }
    return res
        .status(200)
        .clearCookie("accessTokens", options)
        .clearCookie("refreshTokens", options)
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

        const { accessTokens, refreshTokens: newRefreshToken } = await generateAccessAndRefreshTokens(user._id)

        const options = {
            httpOnly: true,
            secure: false
        }

        return res.
            status(200)
            .cookie("refreshTokens", newRefreshToken, options)
            .cookie("accessTokens", accessTokens, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        "refreshTokens": newRefreshToken,
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