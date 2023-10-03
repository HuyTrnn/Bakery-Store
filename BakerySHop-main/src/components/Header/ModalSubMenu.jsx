import { useEffect } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

function ModalSubMenu({ onClose, children, actions }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return ReactDOM.createPortal(
    <div>
      <div className={cx("modal-shadow")} onClick={onClose}></div>
      <div className={cx("modal-content")}>
        <div>
          {actions}
          {children}
        </div>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default ModalSubMenu;
