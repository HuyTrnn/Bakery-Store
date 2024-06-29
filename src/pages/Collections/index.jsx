import styles from "./Collections.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchCollections } from "~/store";
import { useThunk } from "~/hooks";
import { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Helmet } from "react-helmet-async";
import { LoadingComponent } from "~/components";

const cx = classNames.bind(styles);

function Collections() {
  const { data } = useSelector((state) => {
    return state.collections;
  });

  // const { isLoading, data, isSuccess, isError } = useFetchCollectionsQuery();
  const [doFetchCollections, isLoading, error] = useThunk(fetchCollections);

  useEffect(() => {
    doFetchCollections();
  }, [doFetchCollections]);

  let content;
  if (isLoading) {
    content = <></>;
  } else if (error) {
    content = <h1>Lỗi rồi</h1>;
  } else if (data) {
    content = data.map((item) => {
      return (
        <div key={item.id} className={cx("col", "l-6", "m-6", "c-6")}>
          <Link className={cx("content-link")} to={`/collections/${item.id}`}>
            <div className={cx("content-title")}>{item.name}</div>
            <div className={cx("content-sub")}>
              <div className={cx("sub-title")}>
                view the collections
                <IoIosArrowForward />
              </div>
            </div>
            <div className={cx("content-wrapper")}>
              <div
                style={{
                  backgroundImage: `url(data:image/png;base64,${item.image})`,
                }}
                className={cx("content-wrapper-image")}
              ></div>
            </div>

            <div className={cx("content-overlay")}></div>
          </Link>
        </div>
      );
    });
  }

  return (
    <div className={cx("wrapper")}>
      <Helmet>
        <title>Bộ sưu tập – Have good days</title>
      </Helmet>

      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className={cx("grid", "wide")}>
          <div className={cx("row")}>
            <div className={cx("col", "l-12", "m-12", "c-12")}>
              <div className={cx("heading")}>
                <h4>CATALOG</h4>
              </div>
            </div>
          </div>
          <div className={cx("row")}>{content}</div>
        </div>
      )}
    </div>
  );
}

export default Collections;
