import { useParams } from "react-router-dom";
import styles from "./ProductDetailPage.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { getProduct, addToCart } from "~/store";
import {
  InputQuantity,
  Accordion,
  Button,
  LoadingComponent,
} from "~/components";
import { usePriceFormatter, useThunk } from "~/hooks";

import ModalPopUp from "./ModalPopUp";
import { useTranslation } from "react-i18next";
const cx = classNames.bind(styles);

function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [doGetProduct, isLoading, error, data] = useThunk(getProduct);
  const { data: product } = useSelector((state) => state.product);
  const [transalateData, setTransalateData] = useState(product);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const lang = useSelector(state => state.language.lang);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const price = usePriceFormatter(product ? product.price : 0, "VND");
  const total = usePriceFormatter(
    product ? product.price * quantity : 0,
    "VND"
  );

  useEffect(() => {
    doGetProduct(productId);
    console.log('test', lang);
  }, [productId, doGetProduct, lang]);
  const handleChangeQuantity = (value) => {
    setQuantity(value);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const actionContent = (
    <div className={cx("modal-action")}>
      <Button
        className={cx("modal-action-btn")}
        onClick={handleClose}
        primary
        outline
      >
        {t('continue')}
      </Button>
      <Button
        className={cx("modal-action-btn")}
        onClick={handleClose}
        to={"/cart"}
        primary
        outline
      >
        {t('checkout')}
      </Button>
    </div>
  );
  const handleBuying = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      if (quantity !== 0) {
        handleOpen();
        dispatch(
          addToCart({
            userId: user.user_id,
            product: {
              productId: product._id,
              productType: product.id_type,
              productName: product.name,
              productImage: product.images[0],
              quantity,
              price: product.promotion_price || product.price,
              stock: product.stock,
            },
          })
        );
      }
    }
  };

  let content;
  if (isLoading) {
    content = <h1>loading</h1>;
  } else if (error) {
    content = <h1>lỗi rồi</h1>;
  } else if (product) {
    const contentAccordion = [
      {
        id: Math.random(),
        name: t('detail'),
        description: product.description.detail,
      },
    ];
    content = (
      <div className={cx("product-container")}>
        <div className={cx("product-content")}>
          <div className={cx("product-name")}>{product.name}</div>
          <div className={cx("product-price")}>{price}</div>
        </div>
        <div className={cx("product-actions")}>
          <div className={cx("product-action")}>
            <InputQuantity
              maxQuantity={product.stock}
              quantity={quantity}
              onChange={handleChangeQuantity}
            />
            <div>{product.stock} {t('stock')}</div>
          </div>

          <button
            onClick={handleBuying}
            disabled={!product.stock}
            className={cx("btn-purchase", {
              "btn--sold-out": !product.stock,
            })}
          >
            {product.stock ? t("add-cart") : "Sold out"}
            <span>•</span>
            {total}
          </button>
        </div>

        {isOpen && (
          <ModalPopUp actions={actionContent} onClose={handleClose}>
            <div className={cx("modal-heading")}>
              {t("added")}
            </div>
          </ModalPopUp>
        )}
        <Accordion items={contentAccordion} />
        <div className={cx("product-note")}>
          {t('VAT')}
        </div>
      </div>
    );
  }

  return (
    <div className={cx("wrapper")}>
      <Helmet>
        <title>{product ? product.name : "sản phẩm"} – Have good days</title>
      </Helmet>
      <div>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <div className={cx("grid", "wide")}>
            <div className={cx("row")}>
              <div className={cx("col", "l-8", "m-6", "c-12")}>
                <div className={cx("product-wrapper-image")}>
                  <img
                    className={cx("product-image")}
                    src={
                      product ? `${product.images[0]}` : ""
                    }
                    alt="err"
                  />
                </div>
              </div>
              <div className={cx("col", "l-4", "m-6", "c-12")}>{content}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;
