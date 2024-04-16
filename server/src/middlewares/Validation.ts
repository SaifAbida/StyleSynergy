import { validationResult } from "express-validator";
import { NextFunction, Response } from "express";
import { AuthentificatedRequest } from "../Authentificated Request/AuthentificatedRequest";

export const validation = (
  req: AuthentificatedRequest,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(errors.array()[0].msg);
  }
  next();
};
