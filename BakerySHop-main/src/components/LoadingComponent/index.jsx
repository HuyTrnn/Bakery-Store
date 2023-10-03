import classNames from "classnames/bind";
import styles from "./LoadingComponent.module.scss";
import { AiOutlineLoading } from "react-icons/ai";

const cx = classNames.bind(styles);

function LoadingComponent() {
  return (
    <div className={cx("wrapper")}>
      <div>
        <AiOutlineLoading className={cx("icon")} />
        loading ....
      </div>
    </div>
  );
}

export default LoadingComponent;
