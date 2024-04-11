import Slide from "../../components/Slide/Slide";
import "./Home.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import { Product } from "../../Types/Types";
import axios, { AxiosResponse } from "axios";

const Home = () => {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [onSale, setOnsale] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/product/?sort=stock&limit=4")
      .then((res: AxiosResponse) => {
        setBestSellers(res.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/product/?sort=price&limit=4")
      .then((res: AxiosResponse) => {
        setOnsale(res.data.products);
      })
      .catch((error) => {
        console.error(error);
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
          {bestSellers.length === 0 ? (
            <p>Loading best sellers...</p>
          ) : (
            bestSellers.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                images={product.images}
                name={product.name}
                category={product.category}
                price={product.price}
              />
            ))
          )}
        </div>
      </section>
      <section id="onsale">
        <p className="sellers-title">On-sale deals :</p>
        <div className="best-sellers">
          {onSale.length === 0 ? (
            <p>Loading best sellers...</p>
          ) : (
            onSale.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                images={product.images}
                name={product.name}
                category={product.category}
                price={product.price}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
