import { Product } from "../modules/productModule";
import { Request, Response } from "express";
import { MongooseQueryParser } from "mongoose-query-parser";

export class ManageProducts {
  static async getProducts(req: Request, res: Response) {
    try {
      const totalElements = await Product.countDocuments();
      const parser = new MongooseQueryParser();
      const parsed = parser.parse(req.query);
      const page = Number(req.query.skip) || 1;
      const limit = Number(req.query.limit) || 12;
      const totalPages = Math.ceil(totalElements / limit);
      const skip = (page - 1) * limit;
      console.log(parsed.limit)
      const products = await Product.find(parsed.filter)
        .skip(skip)
        .sort(parsed.sort)
        .limit(limit)
        .select(parsed.select);

      res.status(200).send({
        totalPages,
        products,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }
  static async getOneProduct(req: Request, res: Response) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        res.status(404).send("Product not found");
      }
      res.status(200).send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }
  static async createProduct(req: Request, res: Response) {
    try {
      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(200).send(savedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }
  static async updateProduct(req: Request, res: Response) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedProduct) {
        res.status(404).send("Product not found");
      }
      res.status(200).send(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }
  static async deleteProduct(req: Request, res: Response) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        res.status(404).send("Product not found");
      }
      res.status(200).send("Product deleted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error occurred");
    }
  }
}
