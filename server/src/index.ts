import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import productRouter from "./routes/productRoutes";
import wishListRouter from "./routes/wishlistRoutes";
import orderRouter from "./routes/orderRoutes";
import cartRouter from "./routes/cartRoutes";

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/wishlist", wishListRouter);
app.use("/order", orderRouter);
app.use("/cart", cartRouter);

// DATABASE CONNECTION AND INITIATING SERVER :

mongoose
  .connect("mongodb://localhost:27017/stylesynergy")
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Database connected and server is running on port ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });
