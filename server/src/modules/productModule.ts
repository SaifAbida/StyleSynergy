import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "The username is required"],
  },
  price: {
    type: Number,
    required: [true, "The price is required"],
  },
  stock: { type: Number, required: true },
  size: { type: String, required: true },
  images: { type: String, required: true },
  category: {
    type: String,
    required: [true, "The category is required"],
  },
  description: {
    type: String,
    required: [true, "The description is required"],
  },
});


export const Product = mongoose.model("Product", productSchema);
