import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "The username is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      trim: true,
    },
    phoneNumber: {
      type: Number,
      required: [true, "The phone number is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "The password is required"],
      trim: true,
    },
    wishlist: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
      default: [],
    },
    cart: {
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          quantity: { type: Number },
          size: String,
        },
      ],
      default: [],
    },
    totalCart: { type: Number, default: 0 },
    orders: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
