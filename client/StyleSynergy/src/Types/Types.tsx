export type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  size: "S" | "M" | "L" | "XL";
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
