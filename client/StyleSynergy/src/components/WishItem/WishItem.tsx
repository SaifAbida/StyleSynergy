import { Stack } from "react-bootstrap";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { WishItemProps } from "../../Types/Types";

const WishItem = ({ images, name, category, id }: WishItemProps) => {
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
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Stack>
      <hr />
    </>
  );
};

export default WishItem;
