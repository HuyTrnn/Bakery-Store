import { useState } from "react";
import { GoChevronLeft, GoChevronDown } from "react-icons/go";
import classNames from "classnames/bind";
import styles from "./Accordion.module.scss";

const cx = classNames.bind(styles);

function Accordion({ items, heading }) {
  const [appendedIndex, setAppendedIndex] = useState(0);
  const handleClick = (index) => {
    setAppendedIndex((current) => {
      if (current === index) {
        return -1;
      } else {
        return index;
      }
    });
  };
  const renderItems = items.map((item, index) => {
    const isAppended = appendedIndex === index;

    const icon = (
      <span>{isAppended ? <GoChevronDown /> : <GoChevronLeft />}</span>
    );
    return (
      <div className={cx("accordion-item")} key={item.id}>
        <div
          className={cx("accordion-title")}
          onClick={() => {
            handleClick(index);
          }}
        >
          <div>{item.name}</div>
          <div>{icon}</div>
        </div>
        {isAppended && (
          <div className={cx("accordion-content")}>{item.description}</div>
        )}
      </div>
    );
  });
  return (
    <div className={cx("wrapper")}>
      {heading ? (
        <div className={cx("accordion-heading")}>{heading}</div>
      ) : (
        <></>
      )}
      <div className={cx("accordion-list")}>{renderItems}</div>
    </div>
  );
}

export default Accordion;
