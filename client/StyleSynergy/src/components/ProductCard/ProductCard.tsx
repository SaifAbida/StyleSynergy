import "./ProductCard.css";
import { ProductCardProps } from "../../Types/Types";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";

const ProductCard = ({
  name,
  price,
  category,
  images,
  id,
}: ProductCardProps) => {
  const token = localStorage.getItem("token");

  function handleClick() {
    axios
      .patch(
        `http://127.0.0.1:8000/cart/add/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((_: AxiosResponse) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Product added successfully",
        });
      })
      .catch((error) => {
        console.error(error);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          title: "Error has occurred",
        });
      });
  }

  return (
    <div className="cardContainer ">
      <div className="shadow p-3 mb-5 bg-body-tertiary rounded">
        <div className="card" style={{ width: "18rem" }}>
          <img src={images} className="card-img-top" alt="child-img" />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">Price: {price} $</p>
            <p className="card-text">Category: {category}</p>
            <button type="button" className="btn btn-dark ">
              More Details
            </button>
            <button
              type="button"
              className="btn btn-dark ms-4"
              onClick={handleClick}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
