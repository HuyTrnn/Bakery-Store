import styles from "./sidebar.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function SideBar() {
  return <div className={cx("wrapper")}></div>;
}

export default SideBar;
