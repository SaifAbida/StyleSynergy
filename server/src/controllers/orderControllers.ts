import { AuthentificatedRequest } from "../Authentificated Request/AuthentificatedRequest";
import { Response } from "express";
import { Order } from "../modules/orderModule";
import { User } from "../modules/userModule";
import { Product } from "../modules/productModule";
import mongoose from "mongoose";

export class ManageOrders {
  static async createOrder(req: AuthentificatedRequest, res: Response) {
    try {
      const { shipping } = req.body;
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const newOrder = new Order({
        userID: user._id,
        products: user.cart,
        total: user.totalCart,
        shipping,
        status: "pending",
      });

      user.cart.splice(0, user.cart.length);
      user.totalCart = 0;
      const savedOrder = await newOrder.save();
      user.orders.push(savedOrder._id);
      await user.save();
      res.status(200).json(savedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create order" });
    }
  }
  static async deliverOrder(req: AuthentificatedRequest, res: Response) {
    try {
      const order = await Order.findById(req.params.id);
      order.status = "delivered";
      await order.save();
      res.status(200).send(order);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }
  static async getOrders(req: AuthentificatedRequest, res: Response) {
    try {
      const orders = await Order.find({ userID: req.user.id });
      res.status(200).send(orders);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }
  static async getOrder(req: AuthentificatedRequest, res: Response) {
    try {
      const order = await Order.findById(req.params.id).populate("products");
      if (!order) {
        return res.status(404).send("Order not found");
      }
      const objectId = new mongoose.Types.ObjectId(req.user.id);
      if (order.userID.toString() !== objectId.toString()) {
        return res.status(400).send("Unauthorized access");
      }
      res.status(200).send(order);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }
  static async deleteOrder(req: AuthentificatedRequest, res: Response) {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).send("Order not found");
      }
      const objectId = new mongoose.Types.ObjectId(req.user.id);
      if (order.userID.toString() !== objectId.toString()) {
        return res.status(400).send("Bad Request");
      }
      await order.deleteOne();
      res.status(200).send("Order deleted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }
}
