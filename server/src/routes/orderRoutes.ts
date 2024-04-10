import { ManageOrders } from "../controllers/orderControllers";
import express from "express";
import { VerifyLogin } from "../middlewares/VerfiyLogin";

const router = express.Router();

router.get("/", VerifyLogin.verifyLogin, ManageOrders.getOrders);
router.post("/", VerifyLogin.verifyLogin, ManageOrders.createOrder);
router.patch("/:id", VerifyLogin.verifyLogin, ManageOrders.deliverOrder);
router.get("/:id", VerifyLogin.verifyLogin, ManageOrders.getOrder);
router.delete("/:id", VerifyLogin.verifyLogin, ManageOrders.deleteOrder);

export default router;
