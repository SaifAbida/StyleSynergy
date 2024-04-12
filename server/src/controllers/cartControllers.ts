import { AuthentificatedRequest } from "../Authentificated Request/AuthentificatedRequest";
import { User } from "../modules/userModule";
import { Response } from "express";
import { Product } from "../modules/productModule";
import mongoose from "mongoose";
interface CartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number; // Optional, depending on your cart schema
}

export class ManageCart {
  static async addtoCart(req: AuthentificatedRequest, res: Response) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      const objectId = new mongoose.Types.ObjectId(req.params.id);

      // Find the item in the cart by productId
      const itemIndex = user.cart.findIndex((item) =>
        item.productId.equals(objectId)
      );

      if (itemIndex !== -1) {
        // If item already exists in cart, update its quantity
        user.cart[itemIndex].quantity += req.body.quantity || 1;
      } else {
        // If item doesn't exist in cart, add it
        user.cart.push({
          productId: objectId,
          quantity: req.body.quantity || 1,
        });
      }

      //Calcuate TotalCart :
      const productsID = user.cart.map((element) => element.productId);

      const products = await Promise.all(
        productsID.map((id) => Product.findById(id))
      );
      let calculateTotal = 0;
      products.map((product) => (calculateTotal += product.price));
      user.totalCart = calculateTotal;

      await user.save();
      res.status(200).send(user.cart);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }

  static async deleteFromCart(req: AuthentificatedRequest, res: Response) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      const objectId = new mongoose.Types.ObjectId(req.params.id);
      const index = user.cart.findIndex((item) =>
        item.productId.equals(objectId)
      );
      if (index !== -1) {
        user.cart.splice(index, 1);
      }
      await user.save();
      res.status(200).send(user.cart);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }
  static async getCart(req: AuthentificatedRequest, res: Response) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.status(200).send(user.cart);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }
}
