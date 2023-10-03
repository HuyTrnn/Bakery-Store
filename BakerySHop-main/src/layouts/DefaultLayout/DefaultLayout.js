import styles from "./DefaultPage.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { Header, Footer } from "~/components";

const cx = classNames.bind(styles);

function DefaultPage({ children }) {
  const [isPositionFixed, setIsPositionFixed] = useState(false);

  document.addEventListener("scroll", (e) => {
    let scrollVal = e.target.documentElement.scrollTop;

    if (scrollVal >= 36) {
      setIsPositionFixed(true);
    } else {
      setIsPositionFixed(false);
    }
    return () => {
      document.removeEventListener("scroll");
    };
  });

  return (
    <div className={cx("wrapper")}>
      <Header />
      <div
        className={cx("container", {
          pt: isPositionFixed,
        })}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default DefaultPage;
