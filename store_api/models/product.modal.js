import mongoose from "mongoose";
import { Schema } from "mongoose"


const productsSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name must be provided"],
  },
  price: {
    type: Number,
    required: [true, "Product price must be provided"],
  },
   featured: {
       type: Boolean,
       default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    company: {
        type: String, 
        enum: {
            values: ["ikea", "liddy", "caressa", "marcos"],
            message: "{VALUE} is not supported"
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


export const Product = mongoose.model("Product", productsSchema)