import styles from "./ShopifySectionTemplate.module.scss";
import classNames from "classnames/bind";

import { Card } from "~/components";

const cx = classNames.bind(styles);

function ShopifySectionTemplate({ data }) {
  const dataContentLength = data.content.length;

  const renderItems = data.content.map((item) => {
    if (dataContentLength === 3) {
      return (
        <div key={item.id} className={cx("col", "l-4", "m-4", "c-12")}>
          <Card content={item} />
        </div>
      );
    } else if (dataContentLength === 4) {
      return (
        <div key={item.id} className={cx("col", "l-3", "m-3", "c-12")}>
          <Card content={item} />
        </div>
      );
    } else if (dataContentLength === 6) {
      return (
        <div key={item.id} className={cx("col", "l-2", "m-4", "c-12")}>
          <Card content={item} />
        </div>
      );
    } else if (dataContentLength === 1) {
      return (
        <div key={item.id} className={cx("col", "l-12", "m-12", "c-12")}>
          <Card content={item} />
        </div>
      );
    } else {
      return;
    }
  });
  return (
    <div className={cx("grid", "wide")}>
      <div className={cx("container")}>
        <div className={cx("row")}>
          <div className={cx("col", "l-12", "m-12", "c-12")}>
            <div className={cx("heading", "content-heading")}>
              <p>{data.title}</p>
            </div>
          </div>
        </div>
        <div className={cx("row")}>{renderItems}</div>
      </div>
    </div>
  );
}

export default ShopifySectionTemplate;
