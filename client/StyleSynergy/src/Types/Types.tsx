import { ReactNode } from "react";

export type ProductType = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  size: ["S", "M", "L", "XL"];
  images: string;
  category: "men" | "female" | "children";
  description: string;
};

export type ProductCardProps = {
  name: string;
  images: string;
  id: string;
  category: string;
  price: number;
};

export type userRegister = {
  username: string;
  password: string;
  email: string;
  phoneNumber: number;
};

export type userLogin = {
  username: string;
  password: string;
};

export type userUpdate = {
  username: string;
  email: string;
  phoneNumber: number;
};

export type passwordReset = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type cart = {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string;
  };
  quantity: number;
  size: string;
};

export type cartItemProps = {
  id: string;
  name: string;
  images: string;
  price: number;
  quantity: number;
  size: string;
  setCart: React.Dispatch<React.SetStateAction<cart[]>>;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
};

export type WishItemProps = {
  id: string;
  name: string;
  category: string;
  images: string;
};

export type GlobalContextType = {
  cart: cart[];
  setCart: React.Dispatch<React.SetStateAction<cart[]>>;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  wishlist: ProductType[];
  setWishlist: React.Dispatch<React.SetStateAction<ProductType[]>>;
  total: number;
};

export type ProductInput = {
  size: string;
  quantity: number;
};

export type OrderInput = {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  country: string;
  postCode: number;
};

export type OrderType = {
  _id: string;
  userID: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  country: string;
  postCode: number;
  total: number;
  createdAt: ReactNode;
  status: "delivered" | "pending";
};

export type OrderProps = {
  id: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  country: string;
  postCode: number;
  total: number;
  createdAt: ReactNode;
  status: "delivered" | "pending";
  setOrders: React.Dispatch<React.SetStateAction<OrderType[]>>;
};
