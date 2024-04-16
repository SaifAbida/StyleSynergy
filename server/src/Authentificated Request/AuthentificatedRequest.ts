import { Request } from "express";

type UserType = {
  id: string 
};

export interface AuthentificatedRequest extends Request {
  user: UserType;
}
