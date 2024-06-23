import classNames from "classnames/bind";
import { useState } from "react";
import styles from "./Cart.module.scss";
import { Button, InputQuantity } from "~/components";
import { useDispatch } from "react-redux";
import { updateCart } from "~/store";
import { usePriceFormatter } from "~/hooks";
import { removeProduct } from "~/store";

const cx = classNames.bind(styles);

function ProductCartItem({ product }) {
  const [quantity, setQuantity] = useState(product.quantity);
  const dispatch = useDispatch();
  const total = usePriceFormatter(
    quantity * Number(product.product.price),
    "VND"
  );
  const price = usePriceFormatter(product.product.price, "VND");
  const handleChangeQuantity = (value) => {
    if (value > 0) {
      setQuantity(value);
      dispatch(
        updateCart({
          product: {
            productId: product.productId,
            productType: product.productType,
            quantity: value,
          },
        })
      );
    } else {
      dispatch(removeProduct(product.productId));
    }
  };

  const handleRemove = () => {
    dispatch(removeProduct(product.productId));
  };

  return (
    <div className={cx("product-container")}>
      <div className={cx("row")}>
        <div className={cx("col", "l-5", "m-12", "c-12")}>
          <div className={cx("content-info")}>
            <div
              className={cx("content-image")}
              style={{
                backgroundImage: `url(${product.product.images[0]})`,
              }}
            ></div>
            <div className={cx("content-wrapper")}>
              <div className={cx("content-name")}>{product.productName}</div>
              <Button onClick={handleRemove} className={cx("btn-remove")}>
                remove
              </Button>
            </div>
          </div>
        </div>
        <div className={cx("col", "l-7", "m-0", "c-0")}>
          <div className={cx("product-info")}>
            <div className={cx("row", "h-full")}>
              <div className={cx("col", "l-4")}>
                <div className={cx("product-item")}>{price}</div>
              </div>
              <div className={cx("col", "l-4")}>
                <div className={cx("product-item")}>
                  <InputQuantity
                    quantity={quantity}
                    onChange={handleChangeQuantity}
                    maxQuantity={product.stock}
                  />
                </div>
              </div>
              <div className={cx("col", "l-4")}>
                <div className={cx("product-item", "product-price")}>
                  {total}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCartItem;
