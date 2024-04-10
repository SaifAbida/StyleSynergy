import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
  userID: { type: Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number },
  status: { type: String, default: "pending" },
  shipping: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model("Order", orderSchema);
