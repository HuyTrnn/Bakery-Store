import classNames from "classnames/bind";
import styles from "./CheckoutPage.module.scss";
import FormCheckout from "./FormCheckout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import { usePriceFormatter } from "~/hooks";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import { TbTruckDelivery } from "react-icons/tb";
import { BiStoreAlt } from "react-icons/bi";
import { ImRadioUnchecked, ImRadioChecked2 } from "react-icons/im";

const cx = classNames.bind(styles);

function CheckoutPage() {
  const [paymentType, setPaymentType] = useState(0);
  const { user, isAuthenticated, status } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.cart);
  const total = usePriceFormatter(data.total, "VND");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && status === "error") {
      navigate("/login");
    }
  }, [navigate, isAuthenticated, status]);

  const paymentTypes = [
    {
      id: Math.random(),
      name: "thanh toán khi nhận hàng",
      value: 0,
    },
    {
      id: Math.random(),
      name: "Chuyển khoảng",
      value: 1,
    },
  ];

  const handleChangePaymentType = (value) => {
    if (value !== paymentType) {
      setPaymentType(value);
    }
  };

  let renderProduct;
  if (data) {
    if (data.items) {
      renderProduct = data.items.map((product) => {
        return <ProductItem data={product} key={product.id} />;
      });
    }
  }
  let renderPaymentTypes = paymentTypes.map((type) => (
    <div
      onClick={() => {
        handleChangePaymentType(type.value);
      }}
      key={type.id}
      className={cx("payment-type", {
        active: type.value === paymentType,
      })}
    >
      <div className={cx("payment-type-content")}>
        {type.value === paymentType ? (
          <ImRadioChecked2 />
        ) : (
          <ImRadioUnchecked />
        )}
      </div>
      <div className={cx("payment-type-content")}>
        {type.value === 0 ? <TbTruckDelivery /> : <BiStoreAlt />}
      </div>
      <div className={cx("payment-type-content")}>{type.name}</div>
    </div>
  ));

  return (
    <div className={cx("checkout-wrapper")}>
      <Helmet>
        <title>Thanh Toán – BAKES SAIGON</title>
      </Helmet>

      <div className={cx("grid", "wide")}>
        <div className={cx("row")}>
          <div className={cx("col", "l-6", "m-12", "c-12")}>
            <div className={cx("checkout--container")}>
              <div className={cx("name-store")}>
                <h1>BAKES SAIGON</h1>
              </div>
              <div className={cx("checkout-content")}>
                <div className={cx("checkout-content--heading")}>
                  <h4>Liên hệ</h4>
                </div>
                <div className={cx("order-info")}>
                  <p>{user ? user.email : "Chưa đăng nhập"}</p>
                </div>
              </div>
              <div className={cx("checkout-content")}>
                <div className={cx("checkout-content--heading")}>
                  <h4>Phương thức thanh toán</h4>
                </div>
                <div className={cx("order-info")}>
                  <div>{renderPaymentTypes}</div>
                </div>
              </div>
              <div className={cx("checkout-content")}>
                <div className={cx("checkout-content--heading")}>
                  <h4>Thông tin nhận hàng</h4>
                </div>
                <div className={cx("order-info")}>
                  <FormCheckout paymentType={paymentType} />
                </div>
              </div>
            </div>
          </div>
          <div className={cx("col", "l-6", "m-12", "c-12")}>
            <div className={cx("checkout--container")}>
              <div className={cx("checkout-container--heading")}>
                <h2>Thông Tin Đơn hàng</h2>
              </div>
              <div className={cx("list-order")}>{renderProduct}</div>
              <div className={cx("price")}>
                <div className={cx("")}>Tổng cộng</div>
                <div className={cx("")}>{data ? total : ""}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
