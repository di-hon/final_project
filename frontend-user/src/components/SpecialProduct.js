import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const SpecialProduct = (props) => {
  const { name, brand, images, totalrating, price, sold, quantity, id } = props;
  return (
    <div className="col-6 mb-3">
      <div className="special-product-card">
        <div className="d-flex justify-content-between">
          <div>
            <img src={images[0]?.url} className="img-fluid" alt="watch" />
          </div>
          <div className="special-product-content">
            <h5 className="brand">{brand}</h5>
            <h6 className="title">{name}</h6>
            <ReactStars
              count={5}
              size={24}
              value={totalrating}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price">
              <span className="red-p">INR {price}</span> &nbsp;{" "}
            </p>
            <div className="prod-count my-3">
              <p>Product: {quantity}</p>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: quantity / quantity + sold * 100 + "%" }}
                  aria-valuenow={quantity / quantity + sold * 100}
                  aria-valuemin={quantity}
                  aria-valuemax={sold + quantity}
                ></div>
              </div>
            </div>
            <Link className="button" to={"/product/" + id}>
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
