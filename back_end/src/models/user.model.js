import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index:true
    },
    phone_no: {
        type:Number,
        trim:true,
        required:true,
        length:10,
        index:true
    },
    password: {
      type: String,
      required: [true,'password is required']
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
  },
  {
    timestamps: true
  }
)

//pre save hook for hashing password before saving in db
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//creating methods for userSchema to compare password 
userSchema.methods.isPasswordCorrect = async function (password) { //comparision of password
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessTokens = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      role: this.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d"
    }
  );
};

userSchema.methods.generateRefreshTokens = function () {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "10d"
    }
  );
};

export const User = mongoose.model("User", userSchema)