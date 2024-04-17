import { useEffect, useState } from "react";
import { OrderType } from "../../Types/Types";
import { cart } from "../../Types/Types";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { Stack } from "react-bootstrap";
import "./Order.css";
import { Button } from "@mui/material";

const Order = () => {
  const [order, setOrder] = useState<OrderType>({} as OrderType);
  const [products, setProducts] = useState<cart[]>([] as cart[]);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/order/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: AxiosResponse) => {
        setOrder(res.data.order);
        setProducts(res.data.productDetails);
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/order");
      });
  }, []);

  const OrderBtnStyle = {
    marginTop: "20px",
    marginRight: "125px",
    backgroundColor: "hsla(0, 0%, 18%, 0.8)",
  };

  function handleClick() {
    Swal.fire({
      title: "Are you sure you want to delete this order?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#cc0000",
      cancelButtonColor: "#2e2e2e",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/order/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((_: AxiosResponse) => {
              navigate("/order");
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Order deleted successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            });
        }
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  if (products.length === 0 || !order) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="orderDisplayContainer">
      <div className="orderDetails">
        <h1>Order Details:</h1>
        <p>
          <strong>Ordered by:</strong> {order.firstName} {order.lastName}
        </p>
        <p>
          <strong>Order Date:</strong> {order.createdAt}
        </p>
      </div>
      <div className="orderDetails">
        <h1>Shipping informations: </h1>
        <p>
          <strong>Address:</strong> {order.country}, {order.city},{" "}
          {order.street}, {order.postCode}
        </p>
      </div>
      <div className="orderDetails">
        <h1>Products: </h1>
        <div className="productDetailsDisplay">
          {products.map((p) => (
            <Stack
              direction="horizontal"
              gap={2}
              className="d-flex align-items-center"
              key={p.product._id}
            >
              <img
                src={p.product.images}
                alt="product img"
                className="itemImage"
                style={{
                  width: "80px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "5px",
                  marginTop: "5px",
                }}
              />
              <div className="me-auto">
                <div>
                  {p.product.name}
                  {p.size && (
                    <span style={{ fontSize: "0.8rem", color: "gray" }}>
                      {" "}
                      {`(${p.size})`}
                    </span>
                  )}
                  {p.quantity > 1 && (
                    <span style={{ fontSize: "0.8rem", color: "gray" }}>
                      {" "}
                      x{p.quantity}
                    </span>
                  )}
                </div>
                <div
                  className="text-muted"
                  style={{ fontSize: "0.75rem", color: "gray" }}
                >
                  ${p.product.price.toFixed(2)}
                </div>
              </div>
            </Stack>
          ))}
        </div>
      </div>
      <div className="orderEnd">
        <div className="totalOrder">Total: ${order.total.toFixed(2)}</div>
        {order.status === "delivered" && (
          <Button
            variant="contained"
            style={OrderBtnStyle}
            onClick={handleClick}
          >
            Delete Order
          </Button>
        )}
      </div>
    </div>
  );
};

export default Order;
