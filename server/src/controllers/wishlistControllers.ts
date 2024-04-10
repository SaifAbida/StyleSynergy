import { AuthentificatedRequest } from "../Authentificated Request/AuthentificatedRequest";
import { User } from "../modules/userModule";
import { Response } from "express";
import mongoose from "mongoose";

export class ManageWishList {
  static async getwishList(req: AuthentificatedRequest, res: Response) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.status(200).send(user.wishlist);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }
  static async addProduct(req: AuthentificatedRequest, res: Response) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      const objectId = new mongoose.Types.ObjectId(req.params.id);
      if (!user.wishlist.includes(objectId)) {
        user.wishlist.push(objectId);
      }
      user.wishlist = [...new Set(user.wishlist)];
      await user.save();
      res.status(200).send(user.wishlist);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }
  static async removeProduct(req: AuthentificatedRequest, res: Response) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      const objectId = new mongoose.Types.ObjectId(req.params.id);
      user.wishlist = user.wishlist.filter((id) => !id.equals(objectId));
      await user.save();
      res.status(200).send(user.wishlist);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }
}
