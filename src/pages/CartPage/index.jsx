import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Button } from "~/components";
import styles from "./Cart.module.scss";
import ProductCartItem from "./ProductCartItem";
import NoCart from "./NoCart";
import { Helmet } from "react-helmet-async";

import { usePriceFormatter } from "~/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "~/store";

const cx = classNames.bind(styles);

function CartPage() {
  const [items, setItems] = useState([])
  const { data } = useSelector((state) => state.cart);
  
  const dispatch = useDispatch()
  const total = usePriceFormatter(data ? data.total : 0, "VND");
  const navigate = useNavigate();
  const { status, isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === "error" && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, status, navigate]);

  useEffect(() => {
    if(user) {
      dispatch(fetchCart(user._id)).then(data => {
        setItems(data.payload.items)
      })
    }
  }, [])

  let renderCart;
  if (items) {
    renderCart = items.map((item) => {
      return (
        <div className={cx("col", "l-12", "m-12", "c-12")} key={item.productId}>
          <ProductCartItem key={item.productId} product={item} />
        </div>
      );
    });
  } else {
  }

  return (
    <div className={cx("wrapper")}>
      <Helmet>
        <title>Giỏ hàng của bạn – Have good days</title>
      </Helmet>

      {items.length === 0 ? (
        <NoCart />
      ) : (
        <div className={cx("grid", "wide")}>
          <div className={cx("row")}>
            <div className={cx("col", "l-12", "m-12", "c-12")}>
              <div className={cx("heading")}>Your Cart</div>
            </div>
          </div>
          <div className={cx("row")}>
            <div className={cx("col", "l-5", "m-12", "c-12")}>
              <div className={cx("action-back")}>
                <Button
                  className={cx("btn-back")}
                  leftIcon={<HiOutlineArrowNarrowLeft />}
                >
                  CONTINUE BROWSING
                </Button>
              </div>
            </div>
            <div className={cx("col", "l-7", "m-0", "c-0")}>
              <div className={cx("cart-header")}>
                <div className={cx("row")}>
                  <div className={cx("col", "l-4")}>
                    <div className={cx("cart-title")}>PRICE</div>
                  </div>
                  <div className={cx("col", "l-4")}>
                    <div className={cx("cart-title")}>QUANTITY</div>
                  </div>
                  <div className={cx("col", "l-4")}>
                    <div className={cx("cart-title", "cart-price")}>TOTAL</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("row")}>{renderCart}</div>
          <div className={cx("cart-notes")}>
            <div className={cx("row")}>
              <div className={cx("col", "l-6", "m-12", "c-12")}>
                <div className={cx("cart-notes-wrapper")}>
                  <h5>Note for Bakes (special instructions, writings, etc.)</h5>
                </div>
              </div>
              <div className={cx("col", "l-6", "m-12", "c-12")}>
                <div className={cx("cart-notes-wrapper", "cart-content-price")}>
                  <div className={cx("notes-price")}>
                    SUBTOTAL
                    <span>{total}</span>
                  </div>
                  <div className={cx("notes-describer")}>
                    Shipping & taxes calculated at checkout
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("cart-actions")}>
            <div className={cx("row")}>
              <div className={cx("col", "l-12", "m-12", "c-12")}>
                <div className={cx("cart-action-check-out")}>
                  <Button to={"/checkout"} className={cx("btn-check-out")}>
                    Check out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
