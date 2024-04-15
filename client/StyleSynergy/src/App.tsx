import NavBar from "./components/NavBar.tsx/NavBar";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Men from "./Pages/Men/Men";
import Women from "./Pages/Women/Women";
import Children from "./Pages/Children/Children";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Settings from "./Pages/Settings/Settings";
import Product from "./Pages/Product/Product";
import { createContext, useEffect, useState } from "react";
import { GlobalContextType, ProductType } from "./Types/Types";
import { cart } from "./Types/Types";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import CreateOrder from "./Pages/CreateOrder/CreateOrder";
import Orders from "./Pages/Orders/Orders";

export const globalContext = createContext<GlobalContextType | undefined>(
  undefined
);

function App() {
  const [cart, setCart] = useState<cart[]>([] as cart[]);
  const [wishlist, setWishlist] = useState<ProductType[]>([] as ProductType[]);
  const [total, setTotal] = useState<number>(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get("http://127.0.0.1:8000/cart/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res: AxiosResponse) => {
          setCart(res.data.cart);
          setTotal(res.data.totalCart);
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error has occurred",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get("http://127.0.0.1:8000/wishlist/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res: AxiosResponse) => {
          setWishlist(res.data);
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error has occurred",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  }, []);

  return (
    <BrowserRouter>
      <globalContext.Provider
        value={{ cart, setCart, total, setTotal, wishlist, setWishlist }}
      >
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/children" element={<Children />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/order/new" element={<CreateOrder />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </globalContext.Provider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
