import { Product } from "../modules/productModule";
import { Request, Response } from "express";

export class ManageProducts {
  static async getProducts(req: Request, res: Response) {
    try {
      const totalElements = await Product.countDocuments();
      // FILTERING :
      let queryString = JSON.stringify(req.query);
      queryString = queryString.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      const queryObject = JSON.parse(queryString);
      let query = Product.find(queryObject);
      // SORTING :
      if (req.query.sort) {
        const sortBy = (req.query.sort as string).split(",").join(" ");
        query = query.sort(sortBy);
      }
      //PAGINATION
      const page = (req.query.page as any) * 1 || 1;
      const limit = (req.query.limit as any) * 1 || 12;
      const totalPages = Math.ceil(totalElements / limit);
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);

      const products = await query;
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
