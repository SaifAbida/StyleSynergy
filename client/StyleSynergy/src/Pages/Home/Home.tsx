import Slide from "../../components/Slide/Slide";
import "./Home.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import { ProductType } from "../../Types/Types";
import axios, { AxiosResponse } from "axios";
import { Skeleton } from "@mui/material";
import Swal from "sweetalert2";

const Home = () => {
  const [bestSellers, setBestSellers] = useState<ProductType[]>([]);
  const [onSale, setOnsale] = useState<ProductType[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/product/?sort=stock&limit=4")
      .then((res: AxiosResponse) => {
        setBestSellers(res.data.products);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data,
        });
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/product/?sort=price&limit=4")
      .then((res: AxiosResponse) => {
        setOnsale(res.data.products);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data,
        });
      });
  }, []);

  return (
    <>
      <section id="home">
        <Slide />
      </section>
      <section id="best-sellers">
        <p className="sellers-title">Best Sellers :</p>
        <div className="best-sellers">
          {bestSellers.map((product) =>
            !product ? (
              <>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
              </>
            ) : (
              <ProductCard
                key={product._id}
                id={product._id}
                images={product.images}
                name={product.name}
                category={product.category}
                price={product.price}
              />
            )
          )}
        </div>
      </section>
      <section id="onsale">
        <p className="sellers-title">On-sale deals :</p>
        <div className="best-sellers">
          {onSale.map((product) =>
            !product ? (
              <>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
              </>
            ) : (
              <ProductCard
                key={product._id}
                id={product._id}
                images={product.images}
                name={product.name}
                category={product.category}
                price={product.price}
              />
            )
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
