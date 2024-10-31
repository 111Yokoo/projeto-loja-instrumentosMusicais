import React, { useState, useEffect } from "react";
import BannerImageOne from "../../assets/images/Banner-Home-One-Web.png";
import BannerImageTwo from "../../assets/images/Banner-Home-Two-Web.png";
import BannerImageTree from "../../assets/images/Banner-Home-Tree-Web.png";
import BannerImageOneMobile from "../../assets/images/Banner-Home-One-Mobile.png";
import BannerImageTwoMobile from "../../assets/images/Banner-Home-Two-Mobile.png";
import BannerImageTreeMobile from "../../assets/images/Banner-Home-Tree-Mobile.png";
import "./styles.css";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([BannerImageOne, BannerImageTwo, BannerImageTree]);

  useEffect(() => {
    const updateImages = () => {
      if (window.innerWidth <= 660) {
        setImages([BannerImageOneMobile, BannerImageTwoMobile, BannerImageTreeMobile]);
      } else {
        setImages([BannerImageOne, BannerImageTwo, BannerImageTree]);
      }
    };

    updateImages(); // Call once on mount

    window.addEventListener("resize", updateImages);
    return () => {
      window.removeEventListener("resize", updateImages);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <section className="banner">
      <img src={images[currentIndex]} width="100%" alt={`Banner ${currentIndex + 1}`} />
      <div className="navigation">
        <button className="nav-button left" onClick={handlePrev}>❮</button>
        <button className="nav-button right" onClick={handleNext}>❯</button>
      </div>
    </section>
  );
};

export default Banner;