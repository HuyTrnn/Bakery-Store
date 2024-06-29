import styles from "./About.module.scss";
import classNames from "classnames/bind";
import { Banner, LoadingComponent } from "~/components";
import { useSelector } from "react-redux";
import {
  fetchAboutBaker,
  fetchAboutKitchen,
  fetchPosition,
  fetchHiring,
} from "~/store";
import { useThunk } from "~/hooks";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Fragment } from "react";

const cx = classNames.bind(styles);

function AboutPage() {
  const banner = {
    url: "https://theme.hstatic.net/1000365849/1000614631/14/img_instagram1.jpg?v=272",
  };

  return (
    <div className={cx("wrapper")}>
      <Helmet>
        <title>Về chúng tôi – Have good days Shop</title>
      </Helmet>
      <Banner image={banner} />

      <div className={cx("our-story")}>
        <div className={cx("grid", "wide")}>
          <Fragment>
            <div className={cx("row")}>
              <div className={cx("col", "l-12", "m-12", "c-12")}>
                <div className={cx("heading", "heading--left")}>
                  <h4>Về chúng tôi</h4>
                </div>
              </div>
            </div>
            <div className={cx("row")}>
              <div className={cx("col", "l-6", "m-6", "c-12")}>
                <div className={cx("our-story-content")}>
                  Chắc hẳn chúng ta đều đã và đang gặp phải những rắc rối nhỏ
                  nhặt trong cuộc sống hàng ngày từ việc túi áo quần bị quá tải
                  bởi nhiều vật dụng cho tới việc chìa khóa, tai nghe, điện
                  thoại bị thất lạc trong chính chiếc balo, túi xách mà chúng ta
                  bỏ vào một cách lộn xộn. Nhưng rồi chúng ta dần cho đó là thói
                  quen và sống chung với những vấn đề "nhỏ nhặt" này...
                </div>
              </div>
              <div className={cx("col", "l-6", "m-6", "c-12")}>
                <div className={cx("our-story-content")}>
                  Với thông điệp "More than Simplicity", Camelia dành trọn tâm
                  huyết để làm ra các sản phẩm của mình. Không chỉ là sự đơn
                  giản ở thiết kế bên ngoài giúp cho người dùng đỡ mất thời gian
                  suy nghĩ đến việc lựa chọn quần áo phù hợp, mà thiết kế bên
                  trong của mỗi sản phẩm đều được chăm chút, tinh gọn nhằm tạo
                  ra sự tiện lợi và ngăn nắp cho người sử dụng.
                </div>
              </div>
            </div>
          </Fragment>
        </div>
      </div>
      <div className={cx("our-kitchen")}>
        <div className={cx("grid", "wide")}>
          <div className={cx("row", "no-gutters")}>
            <div className={cx("col", "l-6", "m-6", "c-12")}>
              <div className={cx("theme-container")}>
                <div className={cx("heading", "heading--left")}>
                  <h4>Câu chuyện</h4>
                </div>
                <div className={cx("theme-content")}>
                  {" "}
                  Với thông điệp "More than Simplicity", Camelia dành trọn tâm
                  huyết để làm ra các sản phẩm của mình
                </div>
              </div>
            </div>
            <div className={cx("col", "l-6", "m-6", "c-12")}>
              <div className={cx("theme-container")}>
                <div
                  className={cx("theme--image")}
                  style={{
                    backgroundImage: `url('https://theme.hstatic.net/1000365849/1000614631/14/img_instagram1.jpg?v=272)`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cx("recruitment")}>
        <div className={cx("grid", "wide")}>
          <div className={cx("row")}>
            <div className={cx("col", "l-12", "c-12", "m-12")}>
              <div className={cx("heading")}>
                <h4>AVAILABLE POSITIONS</h4>
              </div>
            </div>
          </div>
          <div className={cx("row")}>
            {" "}
            <div className={cx("col", "l-4", "m-4", "c-12")}>
              <div className={cx("cart--container")}>
                <div className={cx("cart--image")}>
                  <div
                    className={cx("lazy--image")}
                    style={{
                      backgroundImage: `url(${banner.url})`,
                    }}
                  ></div>
                </div>
                <div className={cx("cart--content")}>
                  <div className={cx("cart--heading")}>
                    <h5>Bếp trưởng</h5>
                  </div>
                  <div className={cx("cart--description")}>
                    <p>
                      {" "}
                      Với thông điệp "More than Simplicity", Camelia dành trọn
                      tâm huyết để làm ra các sản phẩm của mình
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("col", "l-4", "m-4", "c-12")}>
              <div className={cx("cart--container")}>
                <div className={cx("cart--image")}>
                  <div
                    className={cx("lazy--image")}
                    style={{
                      backgroundImage: `url(${banner.url})`,
                    }}
                  ></div>
                </div>
                <div className={cx("cart--content")}>
                  <div className={cx("cart--heading")}>
                    <h5>Bếp trưởng</h5>
                  </div>
                  <div className={cx("cart--description")}>
                    <p>
                      {" "}
                      Với thông điệp "More than Simplicity", Camelia dành trọn
                      tâm huyết để làm ra các sản phẩm của mình
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("col", "l-4", "m-4", "c-12")}>
              <div className={cx("cart--container")}>
                <div className={cx("cart--image")}>
                  <div
                    className={cx("lazy--image")}
                    style={{
                      backgroundImage: `url(${banner.url})`,
                    }}
                  ></div>
                </div>
                <div className={cx("cart--content")}>
                  <div className={cx("cart--heading")}>
                    <h5>Bếp trưởng</h5>
                  </div>
                  <div className={cx("cart--description")}>
                    <p>
                      {" "}
                      Với thông điệp "More than Simplicity", Camelia dành trọn
                      tâm huyết để làm ra các sản phẩm của mình
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("our-kitchen")}>
        {/* <div className={cx("grid", "wide")}>{contentHiring}</div> */}
      </div>
    </div>
  );
}

export default AboutPage;
