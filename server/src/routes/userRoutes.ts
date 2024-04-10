import express from "express";
import {
  Authentificate,
  UpdateAccount,
  GetUser,
} from "../controllers/userControllers";
import { VerifyLogin } from "../middlewares/VerfiyLogin";

const router = express.Router();

// AUTHENTIFICATE :

router.post("/register", Authentificate.register);
router.post("/login", Authentificate.login);

// ACCOUNT MANAGMENT :

router.get("/", VerifyLogin.verifyLogin, GetUser.getUser);
router.patch("/reset", VerifyLogin.verifyLogin, UpdateAccount.passwordReset);
router.put("/update", VerifyLogin.verifyLogin, UpdateAccount.updateUser);
router.delete("/delete", VerifyLogin.verifyLogin, UpdateAccount.deleteAccount);

// ACCOUNT ACTIVITY :


export default router;
