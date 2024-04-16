import { body } from "express-validator";

export const OrderValidators = [
  body("firstName")
    .notEmpty()
    .withMessage("The first name should not be empty"),
  body("firstName").trim(),
  body("firstName").isString().withMessage("The first name should be a string"),
  body("lastName").notEmpty().withMessage("The last name should not be empty"),
  body("lastName").trim(),
  body("lastName").isString().withMessage("The last name should be a string"),
  body("street").notEmpty().withMessage("The street should not be empty"),
  body("street").trim(),
  body("street").isString().withMessage("The street should be a string"),
  body("city").notEmpty().withMessage("The city should not be empty"),
  body("city").trim(),
  body("city").isString().withMessage("The city should be a string"),
  body("country").notEmpty().withMessage("The country should not be empty"),
  body("postCode").isNumeric().withMessage("The post code should be a number"),
  body("postCode").notEmpty().withMessage("The post code should not be empty"),
  body("postCode").trim(),
];
