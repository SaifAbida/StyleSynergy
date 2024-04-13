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
};


export type cartItemProps = {
  id: string;
  name: string;
  images: string;
  price: number;
  quantity: number;
  total: number;
  setCart: React.Dispatch<React.SetStateAction<cart[]>>;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
};

export type WishItemProps = {
  id: string;
  name: string;
  category: string;
  images: string;
};
