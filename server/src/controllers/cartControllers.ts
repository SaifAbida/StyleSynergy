import { AuthentificatedRequest } from "../Authentificated Request/AuthentificatedRequest";
import { User } from "../modules/userModule";
import { Response } from "express";
import { Product } from "../modules/productModule";
import mongoose from "mongoose";

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

      const products = await Promise.all(
        user.cart.map(async (p) => {
          const product = await Product.findById(p.productId);
          return { product, quantity: p.quantity };
        })
      );

      const total = products.reduce((acc, p) => {
        return acc + p.product.price * p.quantity;
      }, 0);

      user.totalCart = total;

      await user.save();
      res.status(200).send({ cart: products, totalCart: user.totalCart });
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }

  static async deleteFromCart(req: AuthentificatedRequest, res: Response) {
    try {
      const user = await User.findById(req.user.id).populate("cart");
      if (!user) {
        return res.status(404).send("User not found");
      }

      const objectId = new mongoose.Types.ObjectId(req.params.id);
      const index = user.cart.findIndex((item) =>
        item.productId.equals(objectId)
      );

      if (index !== -1) {
        const price = (await Product.findById(objectId)).price;
        const quantity = user.cart[index].quantity;
        const newTotal = user.totalCart - price * quantity;
        user.totalCart = newTotal;

        user.cart.splice(index, 1);
        await user.save();

        const products = await Promise.all(
          user.cart.map(async (p) => {
            const product = await Product.findById(p.productId);
            return { product, quantity: p.quantity };
          })
        );
        return res
          .status(200)
          .send({ cart: products, totalCart: user.totalCart });
      } else {
        console.log("Item not found in cart.");
        return res.status(404).send("Item not found in cart.");
      }
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
      //Calcuate TotalCart :

      const products = await Promise.all(
        user.cart.map(async (p) => {
          const product = await Product.findById(p.productId);
          return { product, quantity: p.quantity };
        })
      );

      const total = products.reduce((acc, p) => {
        return acc + p.product.price * p.quantity;
      }, 0);

      user.totalCart = total;
      await user.save();
      res.status(200).send({ cart: products, totalCart: user.totalCart });
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }
}
