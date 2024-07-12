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
import axios from "axios";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

function Card({ content }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation()
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
  const price = usePriceFormatter(
    content.price ? content.price : 0,
    "VND"
  );

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      handleOpen();
      const data = {
        product_id: content._id,
        amount: 1,
        user_id: user._id
      }
      axios.post('https://backpack-nu.vercel.app/api/auth/carts', data)
    }
  };
  return (
    <div className={cx("wrapper")}>
      <Link to={`/collections/${content.slug}/${content._id}`}>
        <div className={cx("container")}>
          <div className={cx("container-img")}>
            <img src={content.images[0]} style={{width:'218px', height:'218px'}} alt="product" />
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
            {t("added")}
          </div>
        </ModalPopUp>
      )}
      {!content.stock ? (
        <></>
      ) : (
        <button onClick={handleAddToCart} className={cx("btn-add")}>
          {t("add-cart")}
        </button>
      )}
    </div>
  );
}

export default Card;
