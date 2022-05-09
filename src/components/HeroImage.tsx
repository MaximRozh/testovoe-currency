import React, { FC } from "react";
import Hero from "../assets/hero.svg";
import useImageOnLoad from "../hooks/useImageOnLoad";

const HeroImage: FC = () => {
  const { handleImageOnLoad, css } = useImageOnLoad();

  return (
    <div className="hero-image-container">
      <img
        src={Hero}
        onLoad={handleImageOnLoad}
        style={{ ...css.fullSize }}
        alt="Hero banner"
        className="hero-image"
      />
    </div>
  );
};

export default HeroImage;
