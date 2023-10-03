import { useState, useEffect, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import classNames from "classnames/bind";
import styles from "./SelectBox.module.scss";

const cx = classNames.bind(styles);

function SelectBox({ options, placeholder, onChange, selected, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectBoxRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (!selectBoxRef.current) return;
      if (!selectBoxRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const renderOptions = options.map((option, index) => {
    const handleSelected = () => {
      setIsOpen(false);
      onChange(option);
    };

    return (
      <div className={cx("option")} onClick={handleSelected} key={option.id}>
        {option.label}
      </div>
    );
  });

  return (
    <div
      className={cx("wrapper", { [className]: className })}
      ref={selectBoxRef}
    >
      <div className={cx("header")} onClick={handleDropDown}>
        {selected ? selected.label : placeholder || "Select..."}
        {<GoChevronDown />}
      </div>
      {isOpen && <div className={cx("container")}>{renderOptions}</div>}
    </div>
  );
}

export default SelectBox;
