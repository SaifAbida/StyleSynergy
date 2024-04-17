import { AuthentificatedRequest } from "../Authentificated Request/AuthentificatedRequest";
import { Response } from "express";
import { Order } from "../modules/orderModule";
import { User } from "../modules/userModule";
import { Product } from "../modules/productModule";
import mongoose from "mongoose";

export class ManageOrders {
  static async createOrder(req: AuthentificatedRequest, res: Response) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).send("User not found");
      }

      if (user.cart.length === 0) {
        return res.status(400).send("Your cart is empty");
      }

      const newOrder = new Order({
        ...req.body,
        userID: user._id,
        products: user.cart,
        total: user.totalCart,
      });

      user.cart.map(async (p) => {
        const product = await Product.findById(p.productId);
        product.stock -= p.quantity;
        await product.save();
      });

      user.cart.splice(0, user.cart.length);
      user.totalCart = 0;
      const savedOrder = await newOrder.save();
      user.orders.push(savedOrder._id);
      await user.save();
      res.status(200).send(savedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
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
      const user = await User.findById(req.user.id);
      if (!user) {
        res.status(404).send("User not found");
      }
      const orders = await Order.find({ userID: req.user.id });
      res.status(200).send(orders);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }
  static async getOrder(req: AuthentificatedRequest, res: Response) {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).send("Order not found");
      }
      const objectId = new mongoose.Types.ObjectId(req.user.id);
      if (order.userID.toString() !== objectId.toString()) {
        return res.status(400).send("Unauthorized access");
      }

      const products = await Promise.all(
        order.products.map(async (p) => {
          const product = await Product.findById(p.productId);
          return { product, quantity: p.quantity, size: p.size };
        })
      );

      res.status(200).send({ order, productDetails: products });
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
      const userObjectId = new mongoose.Types.ObjectId(req.user.id);
      const orderObjectId = new mongoose.Types.ObjectId(req.params.id);

      if (order.userID.toString() !== userObjectId.toString()) {
        return res.status(400).send("Bad Request");
      }
      await order.deleteOne();
      const orders = await Order.find({ userID: req.user.id });
      const user = await User.findById(req.user.id);
      user.orders = user.orders.filter(
        (orderId) => orderId.toString() !== orderObjectId.toString()
      );
      await user.save();
      res.status(200).send(orders);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }
}
