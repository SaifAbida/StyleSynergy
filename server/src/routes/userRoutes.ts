import express from "express";
import {
  Authentificate,
  UpdateAccount,
  GetUser,
} from "../controllers/userControllers";
import { VerifyLogin } from "../middlewares/VerfiyLogin";
import { RegisterValidators } from "../Validators/RegisterValidators";
import { passwordResetValidators } from "../Validators/passwordResetValidators";
import { UpdateValidators } from "../Validators/UpdateValidators";
import { validation } from "../middlewares/Validation";

const router = express.Router();

// AUTHENTIFICATE :

router.post(
  "/register",
  RegisterValidators,
  validation,
  Authentificate.register
);
router.post("/login", Authentificate.login);

// ACCOUNT MANAGMENT :

router.get("/", VerifyLogin.verifyLogin, GetUser.getUser);
router.patch(
  "/reset",
  VerifyLogin.verifyLogin,
  passwordResetValidators,
  validation,
  UpdateAccount.passwordReset
);
router.put(
  "/update",
  VerifyLogin.verifyLogin,
  UpdateValidators,
  validation,
  UpdateAccount.updateUser
);
router.delete("/delete", VerifyLogin.verifyLogin, UpdateAccount.deleteAccount);

export default router;
