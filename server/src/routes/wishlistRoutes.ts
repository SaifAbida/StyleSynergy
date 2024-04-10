import { ManageWishList } from "../controllers/wishlistControllers";
import { VerifyLogin } from "../middlewares/VerfiyLogin";
import express from "express";

const router = express.Router();

router.get("/", VerifyLogin.verifyLogin, ManageWishList.getwishList);
router.patch("/add/:id", VerifyLogin.verifyLogin, ManageWishList.addProduct);
router.patch("/delete/:id", VerifyLogin.verifyLogin, ManageWishList.removeProduct);


export default router
