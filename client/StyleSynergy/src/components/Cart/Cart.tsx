import { Badge } from "@mui/material";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { cart } from "../../Types/Types";
import "./Cart.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import Swal from "sweetalert2";
import CartItem from "../CartItem/CartItem";

const Cart = () => {
  const token = localStorage.getItem("token");
  const [cart, setCart] = useState<cart[]>([] as cart[]);
  const [total, setTotal] = useState<number>(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  return (
    <>
      <Badge badgeContent={cart.length} color="error" className="cartBadge">
        <i className="fa-solid fa-cart-shopping" onClick={handleShow}></i>
      </Badge>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.map((product) => (
            <CartItem
              key={product.product._id}
              images={product.product.images}
              id={product.product._id}
              price={product.product.price}
              name={product.product.name}
              quantity={product.quantity}
              total={total}
              setCart={setCart}
              setTotal={setTotal}
            />
          ))}
          {total > 0 ? (
            <div className="ms-auto fw-bold fs-5 total">
              Total: ${total.toFixed(2)}
            </div>
          ) : (
            <div className="ms-auto fw-bold fs-5 total">
              Added products will display here
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Cart;
