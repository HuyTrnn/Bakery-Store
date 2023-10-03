import styles from "./CheckoutPage.module.scss";
import classNames from "classnames/bind";
import { usePriceFormatter } from "~/hooks";

const cx = classNames.bind(styles);

function ProductItem({ data }) {
  let total = usePriceFormatter(data.price * data.quantity, "VND");
  return (
    <div className={cx("product")}>
      <div className={cx("product-info")}>
        <div
          className={cx("product-image")}
          style={{
            backgroundImage: `url(data:image/png;base64,${data.productImage})`,
          }}
        >
          <div className={cx("product-quantity")}>{data.quantity}</div>
        </div>
        <div className={cx("product-name")}>
          <h5>{data.productName}</h5>
        </div>
      </div>
      <div>{total}</div>
    </div>
  );
}

export default ProductItem;
