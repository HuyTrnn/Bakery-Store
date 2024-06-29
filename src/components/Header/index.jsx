import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { useEffect, useRef, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { SlUser } from "react-icons/sl";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import Tippy from "@tippyjs/react/headless";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ModalSubMenu from "./ModalSubMenu";
import TopBar from "./TopBar";
import Button from "../Button";
import { fetchCollections } from "~/store";
import { useThunk } from "~/hooks";

const cx = classNames.bind(styles);

function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const { data } = useSelector((state) => {
    return state.collections;
  });
  const [isPositionFixed, setIsPositionFixed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const headerRef = useRef(null);
  const [doFetchCollections, isLoading, error] = useThunk(fetchCollections);

  useEffect(() => {
    doFetchCollections();
  }, [doFetchCollections]);

  const collection = [
    {
      id: "wallet",
      name: "Wallet",
    },
    {
      id: "backpack",
      name: "Backpack",
    },
    {
      id: "tote",
      name: "Tote",
    },
    {
      id: "crossbag",
      name: "Cross bag",
    },
  ];

  // hidden top bar
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

  const logoSrc =
    "https://cdn.shopify.com/s/files/1/2675/2320/files/BAKES__Logo-06_220x.png?v=1638454703";

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const actionContent = (
    <div className={cx("modal-action")}>
      <Link
        to={isLoggedIn ? "/account" : "/login"}
        className={cx("action-item", "action-login")}
      >
        <SlUser />
      </Link>
      <Button onClick={handleClose} primary>
        <AiOutlineClose />
      </Button>
    </div>
  );

  return (
    <header className={cx("header")} ref={headerRef}>
      {!isPositionFixed ? <TopBar /> : <></>}
      <div
        className={cx("nav-bar", {
          fixed: isPositionFixed,
        })}
      >
        <div className={cx("grid", "wide")}>
          <div className={cx("row")}>
            <div className={cx("col", "l-0", "m-0", "c-2")}>
              <Button className={cx("action--menu")} onClick={handleOpen}>
                <AiOutlineMenu />
              </Button>
              {isOpen && (
                <ModalSubMenu actions={actionContent} onClose={handleClose}>
                  <div className={cx("sub-menu")}>
                    <Link
                      to="/collections"
                      className={cx("menu-item")}
                      onClick={handleClose}
                    >
                      ORDER NOW
                    </Link>
                    <Link
                      to="/about"
                      className={cx("menu-item")}
                      onClick={handleClose}
                    >
                      ABOUT
                    </Link>
                    {/* <Link
                      to="/fags"
                      className={cx("menu-item")}
                      onClick={handleClose}
                    >
                      fags
                    </Link> */}

                    <button>vi</button>
                    <button>en</button>
                  </div>
                </ModalSubMenu>
              )}
            </div>
            <div className={cx("col", "l-6", "m-6", "c-8")}>
              <Button to="/" className={cx("nav-bar--logo")}>
                {/* <img alt="logo" src={logoSrc} /> */}
                <span style={{marginTop:"4px", fontSize: '24px', fontWeight: 'bold', color: 'var(---color-nav-text)'}}>Have good days</span>
              </Button>
            </div>
            <div className={cx("col", "l-6", "m-6", "c-2")}>
              <div className={cx("nav-bar--container")}>
                <div className={cx("row", "w-full")}>
                  <div className={cx("col", "l-10", "m-10", "c-0")}>
                    <div className={cx("nav-bar--menu")}>
                      <Tippy
                        theme="light"
                        placement="bottom"
                        interactive={true}
                        appendTo="parent"
                        render={(attrs) => (
                          <div
                            className={cx("sub-nav")}
                            data-animation="shift-towards-subtle"
                            tabIndex="-1"
                            {...attrs}
                          >
                            {collection.map((item, index) => (
                              <Link
                                to={`/collections/${item.id}`}
                                className={cx("sub-nav-item")}
                                key={item.id}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      >
                        <Link to="/collections" className={cx("menu-item")}>
                          ORDER NOW
                        </Link>
                      </Tippy>
                      <Link to="/about" className={cx("menu-item")}>
                        ABOUT
                      </Link>
                      {/* <Link to="/fags" className={cx("menu-item")}>
                        fags
                      </Link> */}
                    </div>
                  </div>
                  <div className={cx("col", "l-2", "m-2", "c-12")}>
                    <div className={cx("nav-bar-actions")}>
                      <Link
                        to={isLoggedIn ? "/account" : "/login"}
                        className={cx("action-item", "action-login")}
                      >
                        <SlUser />
                      </Link>
                      <Link
                        to={isLoggedIn ? "/cart" : "/login"}
                        className={cx("action-item", "action-cart")}
                      >
                        <BsCart3 />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
