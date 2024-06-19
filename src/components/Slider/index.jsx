import styles from "./Slide.module.scss";
import { useState } from "react";
import classNames from "classnames/bind";
import { Card } from "~/components";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

const cx = classNames.bind(styles);

function Slider({ data, quantityDisplayed = 1 }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const lengthSlide = data && data.length - quantityDisplayed;

  const nextSlide = () => {
    setSlideIndex(slideIndex + 1);
  };

  const prevSlide = () => {
    setSlideIndex(slideIndex - 1);
  };

  const trackStyles = {
    transform: `translateX(-${slideIndex * (100 / quantityDisplayed)}%)`,
  };

  const slideShow = {
    minWidth: `${100 / quantityDisplayed}%`,
  };

  return (
    <div className={cx("carousel")}>
      <div className={cx("carousel-action")}>
        {slideIndex !== 0 ? (
          <div className={cx("btn")} onClick={prevSlide}>
            <AiOutlineArrowLeft />
          </div>
        ) : (
          <div></div>
        )}

        {slideIndex !== lengthSlide ? (
          <div className={cx("btn", "btn-next")} onClick={nextSlide}>
            <AiOutlineArrowRight />
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div className={cx("container")} style={trackStyles}>
        {data &&
          data.map((item, index) => (
            <div className={cx("slide")} style={slideShow} key={item.id}>
              <Card content={item} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Slider;
