import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import wish from "../images/wish.svg";
import watch2 from "../images/watch-1.jpg";
import view from "../images/view.svg";
import { addToWishlist } from "../features/products/productSlice";

const ProductCard = (props) => {
  const { grid, data } = props;
  let location = useLocation();
  const dispatch = useDispatch();

  const addWishlist = (id) => {
    dispatch(addToWishlist(id));
  };

  return (
    <>
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className={`${
              location.pathname == "/product" ? `gr-${grid}` : "col-3"
            } `}
          >
            <div className="product-card position-relative">
              <div className="wishlist-icon position-absolute">
                <button
                  className="border-0 bg-transparent"
                  onClick={() => {
                    addWishlist(item?._id);
                  }}
                  src={wish}
                  alt="wishlish"
                >
                  <img src={wish} alt="wishlist" />
                </button>
              </div>
              <div>
                <img
                  src={item?.images[0].url}
                  className="img-fluid mx-auto"
                  alt="product image"
                  width={160}
                />
              </div>
              <div className="product-details">
                <h6 className="brand">{item?.brand}</h6>
                <h5 className="product-title">{item?.name}</h5>
                <ReactStars
                  count={5}
                  size={24}
                  value={item?.total_rating}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p
                  className={`description ${
                    grid === 12 ? "d-block" : "d-none"
                  }`}
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></p>
                <p className="price">INR {item?.price}</p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <Link
                    to={"/product/" + item?._id}
                    className="border-0 bg-transparent"
                  >
                    <img src={view} alt="view" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
