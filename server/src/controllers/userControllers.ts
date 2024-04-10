import { User } from "../modules/userModule";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthentificatedRequest } from "../Authentificated Request/AuthentificatedRequest";

export class Authentificate {
  static async register(req: Request, res: Response) {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({ ...req.body, password: hash });
      const savedUser = await newUser.save();
      res.status(201).send(savedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const existingUser = await User.findOne({ username });
      if (!existingUser) {
        return res.status(404).send("User not found");
      }
      const verifyPassword = bcrypt.compareSync(
        password,
        existingUser.password
      );
      if (!verifyPassword) {
        return res.status(401).send("Unvalid password");
      }
      const token = jwt.sign(
        { id: existingUser._id },
        process.env.TOKEN_ACCESS_KEY,
        { expiresIn: "24h" }
      );
      res.status(200).send({
        message: `Welcome ${existingUser.username}`,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }
}

export class UpdateAccount {
  static async updateUser(req: AuthentificatedRequest, res: Response) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
      });
      if (!updatedUser) {
        return res.status(404).send("User not found");
      }
      res.status(200).send(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }
  static async passwordReset(req: AuthentificatedRequest, res: Response) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      const { currentPassword, newPassword, confirmPassword } = req.body;
      const verifiyPassword = bcrypt.compareSync(
        currentPassword,
        user.password
      );
      if (!verifiyPassword) {
        return res.status(401).send("Your current password is wrong");
      }
      const verifiyNewPassword = bcrypt.compareSync(newPassword, user.password);
      if (verifiyNewPassword) {
        return res.status(400).send("Bad Request");
      }
      if (newPassword !== confirmPassword) {
        return res
          .status(400)
          .send("The new password and the confirmation are not matching");
      }
      user.password = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
      await user.save();
      res.status(200).send("Password changed successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }
  static async deleteAccount(req: AuthentificatedRequest, res: Response) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.user.id);
      if (!deletedUser) {
        return res.status(404).send("User not found");
      }
      res.status(200).send("Account deleted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }
}

export class GetUser {
  static async getUser(req: AuthentificatedRequest, res: Response) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(400).send("User not found");
      }
      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }
}


