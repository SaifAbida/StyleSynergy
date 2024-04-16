import IconButton from "@mui/material/IconButton/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { OrderProps } from "../../Types/Types";
import "./Order.css";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Order = ({
  firstName,
  lastName,
  street,
  city,
  country,
  postCode,
  total,
  createdAt,
  status,
  id,
  setOrders,
}: OrderProps) => {
  const token = localStorage.getItem("token");

  const BtnStyle = {
    color: "hsla(0, 0%, 18%, 0.8)",
    borderColor: "hsla(0, 0%, 18%, 0.8)",
    width: "150px",
    marginLeft: "10px",
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
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://127.0.0.1:8000/order/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res: AxiosResponse) => {
            setOrders(res.data);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Order deleted successfully",
              showConfirmButton: false,
              timer: 1500,
            }).catch((error) => {
              Swal.fire({
                position: "center",
                icon: "error",
                title: error.response.data,
                showConfirmButton: false,
                timer: 1500,
              });
            });
          });
      }
    });
  }

  return (
    <div className="order-details">
      <p>
        <strong>Ordered by:</strong> {firstName} {lastName}
      </p>
      <p>
        <strong>Address:</strong> {street},{city},{country}
      </p>
      <p>
        <strong>Post Code:</strong> {postCode}
      </p>
      <p>
        <strong>Total price:</strong> ${total.toFixed(2)}
      </p>
      <p>
        <strong>Created at:</strong> {createdAt}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        {status === "pending" ? (
          <span style={{ color: "hsl(209, 100%, 81%)" }}>{status}</span>
        ) : (
          <span style={{ color: "hsl(138, 98%, 53%)" }}>{status}</span>
        )}
      </p>
      <Button variant="outlined" type="submit" style={BtnStyle}>
        <Link
          to={`/order/${id}`}
          style={{ textDecoration: "none", color: "hsla(0, 0%, 18%, 0.8)" }}
        >
          More Details
        </Link>
      </Button>
      {status === "delivered" && (
        <IconButton
          aria-label="delete"
          onClick={handleClick}
          style={{ marginLeft: "80px", marginBottom: "2px" }}
        >
          <DeleteIcon />
        </IconButton>
      )}
    </div>
  );
};

export default Order;
