import { Stack } from "react-bootstrap";
import { cartItemProps } from "../../Types/Types";
import { Button } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";

const CartItem = ({
  images,
  price,
  quantity,
  name,
  id,
  deleteFromCart,
}: cartItemProps) => {
  function handleClick() {
    const token = localStorage.getItem("token");

    axios
      .patch(
        `http://127.0.0.1:8000/cart/delete/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((_: AxiosResponse) => {
        deleteFromCart(id);
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

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={images}
        alt="product img"
        className="itemImage"
        style={{
          width: "100px",
          height: "75px",
          objectFit: "cover",
          padding: "10px auto",
          borderRadius: "13px",
        }}
      />
      <div className="me-auto">
        <div>
          {name}
          {quantity > 1 && (
            <span style={{ fontSize: "0.8rem", color: "gray" }}>
              {" "}
              x{quantity}
            </span>
          )}
        </div>
        <div
          className="text-muted"
          style={{ fontSize: "0.75rem", color: "gray" }}
        >
          ${price}
        </div>
      </div>
      <Button variant="outlined" color="error" onClick={handleClick}>
        x
      </Button>
    </Stack>
  );
};

export default CartItem;
