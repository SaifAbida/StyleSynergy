import { Badge } from "@mui/material";
import "./Wishlist.css";
import { Offcanvas } from "react-bootstrap";
import { useContext, useState } from "react";
import { globalContext } from "../../App";
import WishItem from "../WishItem/WishItem";

const Wishlist = () => {
  const [show, setShow] = useState(false);
  const { wishlist } = useContext(globalContext) || { wishlist: [] };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Badge badgeContent={wishlist.length} color="error" className="wishBadge">
        <i className="fa-solid fa-heart" onClick={handleShow}></i>
      </Badge>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Wishlist</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {wishlist.length > 0 ? (
            wishlist.map((p) => (
              <WishItem
                images={p.images}
                name={p.name}
                category={p.category}
                id={p._id}
              />
            ))
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

export default Wishlist;
