import "./ProductCard.css";

import { ProductCardProps } from "../../Types/Types";

const ProductCard = ({ name, price, category, images }: ProductCardProps) => {
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
            <button type="button" className="btn btn-dark ms-4">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
