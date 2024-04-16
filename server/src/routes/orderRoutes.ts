import { ManageOrders } from "../controllers/orderControllers";
import express from "express";
import { VerifyLogin } from "../middlewares/VerfiyLogin";
import { OrderValidators } from "../Validators/OrderValidators";
import { validation } from "../middlewares/Validation";

const router = express.Router();

router.get("/", VerifyLogin.verifyLogin, ManageOrders.getOrders);
router.post("/", VerifyLogin.verifyLogin,OrderValidators,validation,ManageOrders.createOrder);
router.patch("/:id", VerifyLogin.verifyLogin, ManageOrders.deliverOrder);
router.get("/:id", VerifyLogin.verifyLogin, ManageOrders.getOrder);
router.delete("/:id", VerifyLogin.verifyLogin, ManageOrders.deleteOrder);

export default router;
