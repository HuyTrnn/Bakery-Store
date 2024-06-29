import styles from "./ProductTypePage.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";

import { Card, SelectBox } from "~/components";
import { fetchProductsByCollection, sorted } from "~/store";
import { useThunk } from "~/hooks";

import {
  TfiLayoutGrid2Alt,
  TfiLayoutGrid3Alt,
  TfiLayoutGrid4Alt,
} from "react-icons/tfi";

const cx = classNames.bind(styles);

function ProductTypePage() {
  const [layoutActive, setLayoutActive] = useState(1);
  const [optionSelect, setOptionSelect] = useState(null);
  const { collectionId } = useParams();
  const { data } = useSelector((state) => state.productsByCollection);
  const dispatch = useDispatch();
  const [doFetchProducts, isLoading, error] = useThunk(
    fetchProductsByCollection
  );

  console.log('test ', data);
  useEffect(() => {
    doFetchProducts(collectionId);
  }, [collectionId, doFetchProducts]);

  let content;
  if (isLoading) {
    content = <h1>isLoading</h1>;
  } else if (error) {
    content = <h1>isError</h1>;
  } else if (data) {
    content = data && data.data.map((product) => {
      if (layoutActive === 0) {
        return (
          <div key={product.id} className={cx("col", "l-6", "l-6", "c-6")}>
            <Card content={product} />
          </div>
        );
      } else if (layoutActive === 1) {
        return (
          <div key={product.id} className={cx("col", "l-4", "l-4", "c-4")}>
            <Card content={product} />
          </div>
        );
      }
      return (
        <div key={product.id} className={cx("col", "l-3", "l-3", "c-3")}>
          <Card content={product} />
        </div>
      );
    });
  }

  // layout
  const layouts = [TfiLayoutGrid2Alt, TfiLayoutGrid3Alt, TfiLayoutGrid4Alt];
  const renderLayout = layouts.map((Icon, index) => {
    return (
      <button
        key={index}
        onClick={(e) => {
          const value = parseInt(e.currentTarget.value);
          setLayoutActive(value);
        }}
        value={index}
        className={cx("layout-button", { active: index === layoutActive })}
      >
        <Icon />
      </button>
    );
  });

  // select box

  const handleSelected = (option) => {
    setOptionSelect(option);
    dispatch(sorted(option.value));
  };

  const options = [
    {
      id: Math.random(),
      label: "THEO THỨ TỰ BẢNG CHỮ CÁI, A-Z",
      value: "name-asc",
    },
    {
      id: Math.random(),
      label: "THEO THỨ TỰ BẢNG CHỮ CÁI, Z-A",
      value: "name-desc",
    },
    {
      id: Math.random(),
      label: "Giá, từ cao đến thấp",
      value: "unit_price-asc",
    },
    {
      id: Math.random(),
      label: "Giá, từ thấp đến cao",
      value: "unit_price-desc",
    },
  ];
  return (
    <div className={cx("wrapper")}>
      <Helmet>
        <title>{collectionId || "sản phẩm"} – Have good days</title>
      </Helmet>
      <div className={cx("grid", "wide")}>
        <div className={cx("row")}>
          <div className={cx("col", "l-12", "m-12", "c-12")}>
            <div className={cx("collection-nav")}>
              <div className={cx("collection-nav-buttons")}>
                <SelectBox
                  className={cx("collection-nav-button")}
                  selected={optionSelect}
                  onChange={handleSelected}
                  options={options}
                  placeholder={options[0].label}
                />
              </div>
              <div className={cx("collection-nav-layout")}>{renderLayout}</div>
            </div>
          </div>
        </div>
        <div className={cx("row")}>
          <div className={cx("col", "l-12", "m-12", "c-12")}>
            <div>
              <div className={cx("row")}>{content}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductTypePage;
