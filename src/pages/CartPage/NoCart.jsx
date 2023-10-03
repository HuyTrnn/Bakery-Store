import classNames from "classnames/bind";
import styles from "./Cart.module.scss";

import { BsCart3 } from "react-icons/bs";
import { Button } from "~/components";
const cx = classNames.bind(styles);

function NoCart() {
  return (
    <div className={cx("no-cart-wrapper")}>
      <div className={cx("no-cart-heading")}>
        <h3>Your cart is empty</h3>
      </div>

      <div className={cx("no-cart-content")}>
        <Button to={"/collections"} className={cx("no-cart-icon")}>
          <BsCart3 />
        </Button>
      </div>
    </div>
  );
}

export default NoCart;
