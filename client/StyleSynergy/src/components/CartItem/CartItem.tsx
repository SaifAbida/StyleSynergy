import { Stack } from "react-bootstrap";
import { cartItemProps } from "../../Types/Types";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";

const CartItem = ({
  images,
  price,
  quantity,
  name,
  id,
  size,
  setCart,
  setTotal,
}: cartItemProps) => {
  function handleClick() {
    const token = localStorage.getItem("token");

    axios
      .patch(
        `http://127.0.0.1:8000/cart/delete/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
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

  return (
    <>
      <Stack
        direction="horizontal"
        gap={2}
        className="d-flex align-items-center"
      >
        <img
          src={images}
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
            {name}
            {size && (
              <span style={{ fontSize: "0.8rem", color: "gray" }}>
                {" "}
                {`(${size})`}
              </span>
            )}
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
            ${price.toFixed(2)}
          </div>
        </div>
        <IconButton aria-label="delete" onClick={handleClick}>
          <DeleteIcon />
        </IconButton>
      </Stack>
      <hr />
    </>
  );
};

export default CartItem;
