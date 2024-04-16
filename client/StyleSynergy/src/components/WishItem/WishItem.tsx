import { Stack } from "react-bootstrap";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { WishItemProps } from "../../Types/Types";
import axios, { AxiosResponse } from "axios";
import { useContext } from "react";
import { globalContext } from "../../App";
import Swal from "sweetalert2";

const WishItem = ({ images, name, category, id }: WishItemProps) => {
  const { setWishlist } = useContext(globalContext) || {
    setWishlist: () => {},
  };

  const token = localStorage.getItem("token");

  function handleClick() {
    axios
      .patch(
        `http://127.0.0.1:8000/wishlist/delete/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res: AxiosResponse) => {
        setWishlist(res.data);
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
          <div>{name}</div>
          <div>{category}</div>
        </div>
        <IconButton aria-label="delete" onClick={handleClick}>
          <DeleteIcon />
        </IconButton>
      </Stack>
      <hr />
    </>
  );
};

export default WishItem;
