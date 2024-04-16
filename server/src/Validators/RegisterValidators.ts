import { body } from "express-validator";
import { Model } from "mongoose";
import { User } from "../modules/userModule";

const CheckUnique = (fieldName: string, model: Model<any>) => {
  return body(fieldName).custom(async (value) => {
    const existingUser = await model.findOne({ [fieldName]: value });
    if (existingUser) {
      throw new Error(`${fieldName} is already in use`);
    }
  });
};

export const RegisterValidators = [
  body("username").isString().withMessage("The username should be a string"),
  body("username").trim(),
  CheckUnique("username", User),
  body("username").notEmpty().withMessage("The username should not be empty"),
  body("email").isString().withMessage("The email should be a string"),
  body("email").trim(),
  CheckUnique("email", User),
  body("email").notEmpty().withMessage("The email should not be empty"),
  body("email").isEmail().withMessage("The email should be valid"),
  body("phoneNumber").trim(),
  CheckUnique("phoneNumber", User),
  body("phoneNumber")
    .notEmpty()
    .withMessage("The phoneNumber should not be empty"),
  body("phoneNumber")
    .isMobilePhone("ar-TN")
    .withMessage("The phoneNumber should be valid"),
  body("password")
    .isStrongPassword({
      minLength: 7,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage("Your password is not strong enough"),
  body("password").notEmpty().withMessage("The password should not be empty"),
  body("password").trim(),
];
