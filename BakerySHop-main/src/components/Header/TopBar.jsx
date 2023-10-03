import classNames from "classnames/bind";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

function TopBar() {
  return (
    <div className={cx("top-bar")}>
      <div className={cx("grid", "wide")}>
        <div className={cx("row")}>
          <div className={cx("c-12", "col")}>
            <div className={cx("top-header--content")}>
              <p>Bakery shop</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
