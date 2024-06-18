import styles from "./Banner.module.scss";
import classNames from "classnames/bind";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import img5 from "../../assets/img5.png";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow"; // Import coverflow effect styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import React, { useState, useEffect } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
const cx = classNames.bind(styles);

function Banner({ image, content }) {
  const imageStyle = {
    backgroundImage: `url(${image.url})`,
  };
  const slider = [img1, img2, img3, img5];
  return (
    // <div className={cx("wrapper")}>
    //   <div className={cx("banner-image")} style={imageStyle}></div>
    //   <div className={cx("container", "left-bottom")}>{content}</div>
    // </div>
    <Swiper
    effect="coverflow"
    grabCursor={true}
    centeredSlides={true}
    slidesPerView={2}
    speed={600}
    coverflowEffect={{
      rotate: 0,
      stretch: 0,
      depth: 150,
      modifier: 4,
      slideShadows: true,
    }}
    modules={[Navigation, Pagination, Autoplay]}
    autoplay={{
      delay: 4000,
      disableOnInteraction: false,
    }}
    loop={true}
    pagination={{
      el: ".swiper-pagination",
      clickable: true,
    }}

    className="carousels h-full max-h-[1000px]"
  >
    {slider.map((item, index) => (
      <div
        key={index}
        className="w-full flex flex-col justify-between items-center "
      >
        <SwiperSlide>
          {({ isActive }) => (
            <div className="bg-white h-screen w-full relative">
              {
                <>
                  {!isActive && (
                    <div className="bg-white h-full w-full opacity-30 absolute"></div>
                  )}
                  <img
                    src={item}
                    alt=""
                    className="w-[800px] h-full lg:min-h-[700px] min-h-[525px] max-h-[720px]"
                  />
                </>
              }
            </div>
          )}
        </SwiperSlide>
      </div>
    ))}
  </Swiper>
    
  );
}

export default Banner;
