import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import { useEffect, useState } from "react";
import { ProductInput } from "../../Types/Types";
import { TextField } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import { ProductType } from "../../Types/Types";
import "./Product.css";

const Product = () => {
  const { id } = useParams();
  const [input, setInput] = useState<ProductInput>({} as ProductInput);
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/product/${id}`)
      .then((res: AxiosResponse) => {
        setProduct(res.data);
      })
      .then((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    console.log(input);
  }, [product]);

  function handleChangeText(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }

  function handleChangeSelect(event: SelectChangeEvent) {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="productPage">
      <div className="productContainer">
        <img
          className="shadow p-3 mb-5 bg-body-tertiary rounded"
          src={product.images}
          alt="Product image"
        />
        <div className="productDetails">
          <h1>{product.name}</h1>
          <p>
            <span className="title">Price:</span> ${product.price.toFixed(2)}
          </p>
          <p>
            <span className="title">Category:</span> {product.category}
          </p>
          <InputLabel id="demo-simple-select-label">Size</InputLabel>
          <Select
            name="size"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Size"
            value={input.size}
            required
            onChange={handleChangeSelect}
            style={{ width: "100px" }}
          >
            {product.size.map((s) => (
              <MenuItem value={input.size}>{s}</MenuItem>
            ))}
          </Select>
          <TextField
            name="quantity"
            id="outlined-password-input"
            label="Quantity"
            type="number"
            required
            value={input.quantity}
            onChange={handleChangeText}
            style={{ width: "100px", marginLeft: "20px" }}
          />
          {product.stock > 0 ? (
            <div className="btns">
              <button type="button" className="btn btn-dark">
                Add to cart
              </button>
              <button type="button" className="btn btn-outline-danger ms-3">
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
          ) : (
            <p>Product out of stock</p>
          )}
          <p className="description">
            <span className="title"> Product details: </span>
            <br />
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
