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
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

function AboutPage() {
  const banner = {
    url: "https://theme.hstatic.net/1000365849/1000614631/14/img_instagram1.jpg?v=272",
  };
  const { t } = useTranslation();
  return (
    <div className={cx("wrapper")}>
      <Helmet>
        <title>{t('about-us')} – Have good days Shop</title>
      </Helmet>
      <Banner image={banner} />

      <div className={cx("our-story")}>
        <div className={cx("grid", "wide")}>
          <Fragment>
            <div className={cx("row")}>
              <div className={cx("col", "l-12", "m-12", "c-12")}>
                <div className={cx("heading", "heading--left")}>
                  <h4>{t('about-us')}</h4>
                </div>
              </div>
            </div>
            <div className={cx("row")}>
              <div className={cx("col", "l-6", "m-6", "c-12")}>
                <div className={cx("our-story-content")}>
                  {t('description')}
                </div>
              </div>
              <div className={cx("col", "l-6", "m-6", "c-12")}>
                <div className={cx("our-story-content")}>
                  {t('about.story-meaning')}
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
                  <h4>{t('about.story')}</h4>
                </div>
                <div className={cx("theme-content")}>
                  {" "}
                  {t('about.story-meaning')}
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
