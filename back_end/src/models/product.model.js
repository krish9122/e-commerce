import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        index:true
    },

    description:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    category:{
        type:String,
        required:true
    },

    stock:{
        type:Number,
        required:true
    },

    imageUrl:{
        type:String,
        default:""
    },

    rating:{
        type:Number,
        default:0
    },

    numReviews:{
        type:Number,
        default:0
    }
},{
    timestamps:true
});
export const Product = mongoose.model("Product", productSchema)