import express from "express";
import { ManageProducts } from "../controllers/productControllers";

const router = express.Router();

router.get("/", ManageProducts.getProducts);
router.post("/", ManageProducts.createProduct);
router.get("/:id", ManageProducts.getOneProduct);
router.put("/:id", ManageProducts.updateProduct);
router.delete("/:id", ManageProducts.deleteProduct);

export default router;
