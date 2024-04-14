import { Badge } from "@mui/material";
import { useState, useContext } from "react";
import "./Cart.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import CartItem from "../CartItem/CartItem";
import { globalContext } from "../../App";

const Cart = () => {
  const { cart, setCart, total, setTotal } = useContext(globalContext) || {
    cart: [],
    setCart: () => {},
    total: 0,
    setTotal: () => {},
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
              size={product.size}
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
