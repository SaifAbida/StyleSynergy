import { Request } from "express";
import jwt from "jsonwebtoken";

type UserType = {
  id: string 
};

export interface AuthentificatedRequest extends Request {
  user: UserType;
}
