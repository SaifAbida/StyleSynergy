import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
  userID: { type: Schema.Types.ObjectId, ref: "User" },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  postCode: { type: Number, required: true },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      size: String,
    },
  ],
  total: { type: Number },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model("Order", orderSchema);
