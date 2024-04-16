import { ManageCart } from "../controllers/cartControllers";
import express from "express";
import { VerifyLogin } from "../middlewares/VerfiyLogin";


const router = express.Router();

router.get("/", VerifyLogin.verifyLogin, ManageCart.getCart);
router.patch("/add/:id", VerifyLogin.verifyLogin, ManageCart.addtoCart);
router.patch("/delete/:id", VerifyLogin.verifyLogin, ManageCart.deleteFromCart);

export default router;
