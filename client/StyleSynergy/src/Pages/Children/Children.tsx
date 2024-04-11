import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Product } from "../../Types/Types";
import "./Children.css";
import axios, { AxiosResponse } from "axios";

const Children = () => {
  const [products, setProducts] = useState<Product[]>([] as Product[]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/product/?category=children")
      .then((res: AxiosResponse) => {
        console.log(res.data)
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(()=>{
    console.log(products)
  },[products])
  return (
    <section id="item-list">
      <p className="items-title">Children's Fashion: </p>
      <div className="item-list">
        {products.length === 0 ? (
          <p>Loading best sellers...</p>
        ) : (
          products.map((product) => (
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
  );
};

export default Children;
