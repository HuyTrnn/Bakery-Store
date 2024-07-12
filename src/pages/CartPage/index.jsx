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
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

function CartPage() {
  const [items, setItems] = useState([])
  const { data } = useSelector((state) => state.cart);
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const total = usePriceFormatter(data ? data.total : 0, "VND");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const { status, isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === "error" && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, status, navigate]);

  useEffect(() => {
    setIsLoading(true)
    if(user) {
      dispatch(fetchCart(user._id)).then(data => {
        setItems(data.payload.items)
        localStorage.setItem('cart_id', JSON.stringify(data.payload._id))
        setIsLoading(false)
      })
    }
  }, [])

  let renderCart;
  if (items) {
    renderCart = items.map((item) => {
      return (
        items && items.length > 0 ?
          <div className={cx("col", "l-12", "m-12", "c-12")} key={item.productId}>
          <ProductCartItem key={item.productId} product={item} />
          </div>
        : <NoCart />
      );
    });
  } else {
  }

  return (
    <div className={cx("wrapper")}>
      <Helmet>
        <title>{t("cart")} – Have good days</title>
      </Helmet>

      {
        (items.length === 0 && !isLoading) ? (
        <NoCart />
      ) : (
        <div className={cx("grid", "wide")}>
          <div className={cx("row")}>
            <div className={cx("col", "l-12", "m-12", "c-12")}>
              <div className={cx("heading")}>{t("cart")}</div>
            </div>
          </div>
          <div className={cx("row")}>
            <div className={cx("col", "l-5", "m-12", "c-12")}>
              <div className={cx("action-back")}>
                <Button
                  className={cx("btn-back")}
                  leftIcon={<HiOutlineArrowNarrowLeft />}
                >
                  {t("continue")}
                </Button>
              </div>
            </div>
            <div className={cx("col", "l-7", "m-0", "c-0")}>
              <div className={cx("cart-header")}>
                <div className={cx("row")}>
                  <div className={cx("col", "l-4")}>
                    <div className={cx("cart-title")}>{t("price")}</div>
                  </div>
                  <div className={cx("col", "l-4")}>
                    <div className={cx("cart-title")}>{t("quantity")}</div>
                  </div>
                  <div className={cx("col", "l-4")}>
                    <div className={cx("cart-title", "cart-price")}>{t("total")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("row")}>{renderCart}</div>
          <div className={cx("cart-notes")}>
            <div className={cx("row")}>
              {/* <div className={cx("col", "l-6", "m-12", "c-12")}>
                <div className={cx("cart-notes-wrapper")}>
                  <h5>Note for Have good days (special instructions, writings, etc.)</h5>
                </div>
              </div> */}
              {/* <div className={cx("col", "l-6", "m-12", "c-12")}>
                <div className={cx("cart-notes-wrapper", "cart-content-price")}>
                  <div className={cx("notes-price")}>
                    {t("total")}
                    <span>{total}</span>
                  </div>
                  <div className={cx("notes-describer")}>
                    {t("TAX")}
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className={cx("cart-actions")}>
            <div className={cx("row")}>
              <div className={cx("col", "l-12", "m-12", "c-12")}>
                <div className={cx("cart-action-check-out")}>
                  <Button to={"/checkout"} className={cx("btn-check-out")}>
                    {t("confirm")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </div>
  );
}

export default CartPage;
