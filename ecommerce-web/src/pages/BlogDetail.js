import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import blog from "../images/blog-1.jpg";
import Container from "../components/Container";

const BlogDetail = () => {
  return (
    <>
      <Meta title={"Dynamic Blog Name"} />
      <BreadCrumb title="Dynamic Blog Name" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="blog-detail-card">
              <Link to="/blogs" className="d-flex align-items-center gap-10">
                <HiOutlineArrowLeft className="fs-4" />
                Go back to blog page
              </Link>
              <h3 className="title">A beautiful sunday morning renaissance</h3>
              <img src={blog} className="img-fluid w-100 my-4" alt="blog" />
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem,
                vitae accusamus, non fuga ipsa aliquam vero harum vel facere
                cupiditate ab blanditiis expedita incidunt quas ratione sequi
                cumque esse tempora!
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default BlogDetail;
