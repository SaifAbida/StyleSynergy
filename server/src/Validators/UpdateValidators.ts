import { CustomValidator, ValidationChain, body } from "express-validator";
import { Model } from "mongoose";
import { User } from "../modules/userModule";
import { AuthentificatedRequest } from "../Authentificated Request/AuthentificatedRequest";

const CheckUnique = (fieldName: string, model: Model<any>): ValidationChain => {
  return body(fieldName).custom(async (value, { req }) => {
    const userId = (req as AuthentificatedRequest).user.id;
    if (!(fieldName in req.body)) {
      return;
    }
    if (req.body[fieldName] === req.user[fieldName]) {
      return;
    }
    const existingUser = await model.findOne({ [fieldName]: value });
    if (existingUser) {
      if (existingUser._id.toString() === userId) {
        return;
      } else {
        throw new Error(`${fieldName} is already in use`);
      }
    }
  });
};
export const UpdateValidators = [
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
];
