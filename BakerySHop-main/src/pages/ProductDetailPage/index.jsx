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
const cx = classNames.bind(styles);

function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [doGetProduct, isLoading, error, data] = useThunk(getProduct);
  const { data: product } = useSelector((state) => state.product);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const price = usePriceFormatter(product ? product.unit_price : 0, "VND");
  const total = usePriceFormatter(
    product ? product.unit_price * quantity : 0,
    "VND"
  );

  useEffect(() => {
    doGetProduct(productId);
  }, [productId, doGetProduct]);
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
        Tiếp tục mua hàng
      </Button>
      <Button
        className={cx("modal-action-btn")}
        onClick={handleClose}
        to={"/cart"}
        primary
        outline
      >
        Đi đến giỏ hàng
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
            userId: user.id,
            product: {
              productId: product.id,
              productType: product.id_type,
              productName: product.name,
              productImage: product.image,
              quantity,
              price: product.promotion_price || product.unit_price,
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
    console.log(product);
    const contentAccordion = [
      {
        id: Math.random(),
        name: "description",
        description: product.description,
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
            <div>{product.stock} sản phẩm có sẵn</div>
          </div>

          <button
            onClick={handleBuying}
            disabled={!product.stock}
            className={cx("btn-purchase", {
              "btn--sold-out": !product.stock,
            })}
          >
            {product.stock ? "ADD TO CART" : "Sold out"}
            <span>•</span>
            {total}
          </button>
        </div>

        {isOpen && (
          <ModalPopUp actions={actionContent} onClose={handleClose}>
            <div className={cx("modal-heading")}>
              Đã thêm sản phẩm vào giỏ hàng
            </div>
          </ModalPopUp>
        )}
        <Accordion items={contentAccordion} />
        <div className={cx("product-note")}>
          VAT will be added at check out.
        </div>
      </div>
    );
  }

  return (
    <div className={cx("wrapper")}>
      <Helmet>
        <title>{product ? product.name : "sản phẩm"} – BAKES SAIGON</title>
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
                      product ? `data:image/png;base64,${product.image}` : ""
                    }
                    alt="thọ ngu"
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
