import styles from "./Card.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { addToCart } from "~/store";
import { useSelector, useDispatch } from "react-redux";
import { usePriceFormatter } from "~/hooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "..";
import ModalPopUp from "./ModalPopUp";

const cx = classNames.bind(styles);

function Card({ content }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

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
  const price = usePriceFormatter(
    content.price ? content.price : 0,
    "VND"
  );

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      handleOpen();
      dispatch(
        addToCart({
          userId: user.id,
          product: {
            productId: content.id,
            productType: content.id_type,
            productName: content.name,
            productImage: content.image,
            quantity: 1,
            price: content.promotion_price || content.unit_price,
            stock: content.stock,
          },
        })
      );
    }
  };
  return (
    <div className={cx("wrapper")}>
      <Link to={`/collections/${content.id_type}/${content.id}`}>
        <div className={cx("container")}>
          <div className={cx("container-img")}>
            <img src={content.images[0]} alt="product" />
            {/* {content.new ? (
              <div className={cx("status")}>
                {!content.stock ? "sold out" : "new in"}
              </div>
            ) : (
              <></>
            )} */}
            {/* <div className={cx("status")}>
                {content.quantity ? "sold out" : "new in"}
              </div> */}
          </div>
          <div className={cx("content")}>
            <div className={cx("content-title")}>{content.name}</div>
            <div className={cx("content-price")}>{price}</div>
            {!content.stock ? (
              <div className={cx("content-status")}>Sold out</div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Link>
      {isOpen && (
        <ModalPopUp actions={actionContent} onClose={handleClose}>
          <div className={cx("modal-heading")}>
            Đã thêm sản phẩm vào giỏ hàng
          </div>
        </ModalPopUp>
      )}
      {!content.stock ? (
        <></>
      ) : (
        <button onClick={handleAddToCart} className={cx("btn-add")}>
          Thêm vào giỏ hàng
        </button>
      )}
    </div>
  );
}

export default Card;
