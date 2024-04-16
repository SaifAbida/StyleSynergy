import { body } from "express-validator";

export const passwordResetValidators = [
  body("newPassword")
    .isStrongPassword({
      minLength: 7,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage("Your new password is not strong enough"),
  body("newPassword")
    .notEmpty()
    .withMessage("The new password should not be empty"),
  body("newPassword").trim(),
];
