import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { getUserProductWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/products/productSlice";

const Wishlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getWishlistFromDb();
  }, []);

  const getWishlistFromDb = () => {
    dispatch(getUserProductWishlist());
  };

  const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist);
  const removeFromWishlist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 300);
  };

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <div className="wishlist-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            {" "}
            {wishlistState?.map((item, index) => {
              return (
                <div className="col-3" key={index}>
                  <div className="wishlist-card position-relative">
                    <img
                      onClick={() => {
                        removeFromWishlist(item?._id);
                      }}
                      src="images/cross.svg"
                      alt="cross"
                      className="position-absolute cross img-fluid"
                    />
                    <div className="wishlist-card-image bg-white">
                      <img
                        src={
                          item?.images[0].url
                            ? item?.images[0].url
                            : "images/watch.jpg"
                        }
                        className="img-fluid d-block ms-auto"
                        alt="watch"
                        width={160}
                      />
                    </div>
                    <div className="py-3 px-3">
                      <h5 className="title">{item?.name}</h5>
                      <h6 className="price"> $ {item?.price}</h6>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
