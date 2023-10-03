import styles from "./Banner.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Banner({ image, content }) {
  const imageStyle = {
    backgroundImage: `url(${image.url})`,
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("banner-image")} style={imageStyle}></div>
      <div className={cx("container", "left-bottom")}>{content}</div>
    </div>
  );
}

export default Banner;
