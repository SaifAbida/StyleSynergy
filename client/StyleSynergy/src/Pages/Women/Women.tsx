import ProductCard from "../../components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import { ProductType } from "../../Types/Types";
import axios, { AxiosResponse } from "axios";
import "./Women.css";
import { Skeleton } from "@mui/material";
import { Pagination } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const paginationStyle = {
  marginLeft: "890px",
  marginTop: "30px",
};

const Women = () => {
  const [products, setProducts] = useState<ProductType[]>([] as ProductType[]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/product/?category=female&skip=${page}`)
      .then((res: AxiosResponse) => {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data,
        });
        navigate("/");
      });
  }, [page]);

  function handleChange(_: React.ChangeEvent<unknown>, p: number) {
    setPage(p);
    window.scrollTo(0, 0);
  }

  return (
    <section id="item-list">
      <p className="items-title">Women's Fashion: </p>
      <div className="item-list">
        {products.map((product) =>
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
      <Pagination
        count={totalPages}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
        style={paginationStyle}
      />
    </section>
  );
};

export default Women;
