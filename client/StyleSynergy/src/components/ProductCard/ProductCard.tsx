import "./ProductCard.css";
import { ProductCardProps } from "../../Types/Types";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { globalContext } from "../../App";
import { Link } from "react-router-dom";

const ProductCard = ({
  name,
  price,
  category,
  images,
  id,
}: ProductCardProps) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setCart, setTotal, setWishlist } = useContext(globalContext) || {
    setCart: () => {},
    setTotal: () => {},
    setWishlist: () => {},
  };

  function handleAddWishlist() {
    if (token) {
      axios
        .patch(
          `http://127.0.0.1:8000/wishlist/add/${id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res: AxiosResponse) => {
          setWishlist(res.data);
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
    } else {
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
        icon: "info",
        title: "You need to login first",
      });
      navigate("/login");
    }
  }

  function handleAddCart() {
    if (token) {
      axios
        .patch(
          `http://127.0.0.1:8000/cart/add/${id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res: AxiosResponse) => {
          setCart(res.data.cart);
          setTotal(res.data.totalCart);
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
    } else {
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
        icon: "info",
        title: "You need to login first",
      });
      navigate("/login");
    }
  }

  return (
    <div className="cardContainer ">
      <div className="shadow p-3 mb-5 bg-body-tertiary rounded">
        <div className="card" style={{ width: "18rem" }}>
          <img src={images} className="card-img-top" alt="child-img" />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">Price: ${price.toFixed(2)}</p>
            <p className="card-text">Category: {category}</p>
            <Link
              type="button"
              className="btn btn-dark ms-1"
              to={`/product/${id}`}
            >
              More Details
            </Link>
            <button
              type="button"
              className="btn btn-dark ms-3"
              onClick={handleAddCart}
            >
              Cart
            </button>
            <button
              type="button"
              className="btn btn-outline-danger ms-3"
              onClick={handleAddWishlist}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-heart"
                viewBox="0 0 16 16"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
