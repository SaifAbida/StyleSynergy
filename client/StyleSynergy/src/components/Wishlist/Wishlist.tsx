import { Badge } from "@mui/material";
import "./Wishlist.css";
import { Offcanvas } from "react-bootstrap";
import { useEffect, useState } from "react";

const Wishlist = () => {
  const [show, setShow] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([] as string[]);


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
        <Offcanvas.Body></Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Wishlist;
