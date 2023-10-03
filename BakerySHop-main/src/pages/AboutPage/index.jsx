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
  const [
    doFetchAboutBaker,
    isLoadingOfFetchAboutBaker,
    errorOfFetchAboutBaker,
  ] = useThunk(fetchAboutBaker);
  const [
    doFetchAboutKitchen,
    isLoadingOfFetchAboutKitchen,
    errorOfFetchAboutKitchen,
  ] = useThunk(fetchAboutKitchen);
  const [doFetchPosition, isLoadingOfFetchPosition, errorOfFetchPosition] =
    useThunk(fetchPosition);
  const [doFetchHiring, isLoadingOfFetchHiring, errorOfFetchHiring] =
    useThunk(fetchHiring);
  const banner = {
    url: "https://cdn.shopify.com/s/files/1/2675/2320/files/IMG_5256_3000x.jpg?v=1652873085",
  };

  const { data: aboutBaker } = useSelector((state) => state.aboutBaker);
  const { data: aboutKitchen } = useSelector((state) => state.aboutKitchen);
  const { data: position } = useSelector((state) => state.position);
  const { data: hiring } = useSelector((state) => state.hiring);

  useEffect(() => {
    doFetchAboutBaker();
    doFetchAboutKitchen();
    doFetchPosition();
    doFetchHiring();
  }, [doFetchAboutKitchen, doFetchAboutBaker, doFetchPosition, doFetchHiring]);

  let contentAboutBaker;
  if (isLoadingOfFetchAboutBaker) {
    contentAboutBaker = <LoadingComponent />;
  } else if (errorOfFetchAboutBaker) {
    contentAboutBaker = "error";
  } else if (aboutBaker) {
    contentAboutBaker = aboutBaker.map((item) => {
      return (
        <Fragment key={item.id}>
          <div className={cx("row")}>
            <div className={cx("col", "l-12", "m-12", "c-12")}>
              <div className={cx("heading", "heading--left")}>
                <h4>{item.title}</h4>
              </div>
            </div>
          </div>
          <div className={cx("row")}>
            <div className={cx("col", "l-6", "m-6", "c-12")}>
              <div className={cx("our-story-content")}>
                {item.description_1}
              </div>
            </div>
            <div className={cx("col", "l-6", "m-6", "c-12")}>
              <div className={cx("our-story-content")}>
                {item.description_2}
              </div>
            </div>
          </div>
        </Fragment>
      );
    });
  }
  let contentAboutKitchen;
  if (isLoadingOfFetchAboutKitchen) {
    contentAboutKitchen = <LoadingComponent />;
  } else if (errorOfFetchAboutKitchen) {
    contentAboutKitchen = "error";
  } else if (aboutKitchen) {
    contentAboutKitchen = aboutKitchen.map((item) => {
      return (
        <div className={cx("row", "no-gutters")} key={item.id}>
          <div className={cx("col", "l-6", "m-6", "c-12")}>
            <div className={cx("theme-container")}>
              <div className={cx("heading", "heading--left")}>
                <h4>{item.name}</h4>
              </div>
              <div className={cx("theme-content")}>{item.description}</div>
            </div>
          </div>
          <div className={cx("col", "l-6", "m-6", "c-12")}>
            <div className={cx("theme-container")}>
              <div
                className={cx("theme--image")}
                style={{
                  backgroundImage: `url(data:image/png;base64,${item.image})`,
                }}
              ></div>
            </div>
          </div>
        </div>
      );
    });
  }
  let contentPosition;
  if (isLoadingOfFetchPosition) {
    contentPosition = <LoadingComponent />;
  } else if (errorOfFetchPosition) {
    contentPosition = "error";
  } else if (position) {
    contentPosition = position.map((item) => {
      return (
        <div key={item.id} className={cx("col", "l-4", "m-4", "c-12")}>
          <div className={cx("cart--container")}>
            <div className={cx("cart--image")}>
              <div
                className={cx("lazy--image")}
                style={{
                  backgroundImage: `url(data:image/png;base64,${item.image})`,
                }}
              ></div>
            </div>
            <div className={cx("cart--content")}>
              <div className={cx("cart--heading")}>
                <h5>{item.name}</h5>
              </div>
              <div className={cx("cart--description")}>
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  let contentHiring;
  if (isLoadingOfFetchHiring) {
    contentHiring = <LoadingComponent />;
  } else if (errorOfFetchHiring) {
    contentHiring = "error";
  } else if (hiring) {
    contentHiring = hiring.map((item) => {
      return (
        <div className={cx("row", "no-gutters")} key={item.id}>
          <div className={cx("col", "l-6", "m-6", "c-12")}>
            <div className={cx("theme-container")}>
              <div className={cx("heading", "heading--left")}>
                <h4>{item.title}</h4>
              </div>
              <div className={cx("theme-content")}>{item.description}</div>
            </div>
          </div>
          <div className={cx("col", "l-6", "m-6", "c-12")}>
            <div className={cx("theme-container")}>
              <div
                className={cx("theme--image")}
                style={{
                  backgroundImage: `url(data:image/png;base64,${item.image})`,
                }}
              ></div>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className={cx("wrapper")}>
      <Helmet>
        <title>Về chúng tôi – BAKES SAIGON</title>
      </Helmet>
      <Banner image={banner} />

      <div className={cx("our-story")}>
        <div className={cx("grid", "wide")}>{contentAboutBaker}</div>
      </div>
      <div className={cx("our-kitchen")}>
        <div className={cx("grid", "wide")}>{contentAboutKitchen}</div>
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
          <div className={cx("row")}>{contentPosition}</div>
        </div>
      </div>
      <div className={cx("our-kitchen")}>
        <div className={cx("grid", "wide")}>{contentHiring}</div>
      </div>
    </div>
  );
}

export default AboutPage;
