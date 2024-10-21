import React from "react";
import BannerImage from "../../assets/images/Banner-Home-Web.png"
import "./styles.css";

const Banner = () => {
    return (
    <section className="banner">
      <img src={BannerImage} width="100%" alt="Banner 1"/>
    </section>
  );
};

export default Banner;
