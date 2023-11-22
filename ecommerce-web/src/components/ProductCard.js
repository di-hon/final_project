import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch-1.jpg";
import addcart from "../images/add-cart.svg";
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
            <Link
              // to={`${
              //   location.pathname == "/"
              //     ? "product/:id"
              //     : location.pathname == "/product/:id"
              //     ? "/product/:id"
              //     : ":id"
              // }`}
              className="product-card position-relative"
            >
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
              <div className="product-image">
                <img
                  src={item?.images[0].url}
                  className="img-fluid mx-auto"
                  alt="product image"
                  width={160}
                />
                <img
                  src={watch2}
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
                  value={item?.total_rating.toString()}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p
                  className={`description ${
                    grid === 12 ? "d-block" : "d-none"
                  }`}
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></p>
                ,<p className="price">$ {item?.price}</p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <button className="border-0 bg-transparent">
                    <img src={prodcompare} alt="compare" />
                  </button>
                  <button className="border-0 bg-transparent">
                    <img src={view} alt="view" />
                  </button>
                  <button className="border-0 bg-transparent">
                    <img src={addcart} alt="add cart" />
                  </button>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
