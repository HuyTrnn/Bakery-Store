import styles from "./CheckoutPage.module.scss";
import classNames from "classnames/bind";
import { usePriceFormatter } from "~/hooks";

const cx = classNames.bind(styles);

function ProductItem({ data }) {
  let total = usePriceFormatter(Number(data.product.price) * data.quantity, "VND");
  return (
    <div style={{marginBottom: '6px'}} className={cx("product")}>
      <div className={cx("product-info")}>
        <div
          className={cx("product-image")}
          style={{
            backgroundImage: `url(${data.product.images[0]})`,
            borderRadius: '4px'
          }}
        >
          <div style={{backgroundColor: 'var(---color-nav-text)', color: '#fff'}} className={cx("product-quantity")}>{data.quantity}</div>
        </div>
        <div className={cx("product-name")}>
          <h5>{data.product.name.vi}</h5>
        </div>
      </div>
      <div>{total}</div>
    </div>
  );
}

export default ProductItem;
