import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useThunk } from "~/hooks";
import classNames from "classnames/bind";
import styles from "./account.module.scss";
import { logout } from "~/store";
import { Helmet } from "react-helmet-async";
import { Button, LoadingComponent } from "~/components";
import { useEffect } from "react";

const cx = classNames.bind(styles);
function AccountPage() {
  const [doLogout, isLoading, error, data] = useThunk(logout);
  const navigate = useNavigate();
  const { isAuthenticated, user, accessToken } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isLoading) {
    } else if (error) {
    } else if (data) {
      navigate("/");
      localStorage.removeItem("accessToken");
    }
  }, [isAuthenticated, navigate, isLoading, error, data]);
  const handleLogout = () => {
    doLogout(accessToken);
    navigate("/");
  };

  let renderInfo;
  if (user) {
    renderInfo = (
      <div className={cx("account-info")}>
        <div className={cx("content-info")}>
          <div className={cx("content-title")}>Email:</div>
          <div>{user.email}</div>
        </div>
        <div className={cx("content-info")}>
          <div className={cx("content-title")}>Name:</div>
          <div>{user.name}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cx("wrapper")}>
      <Helmet>
        <title>Tài khoản – BAKES SAIGON</title>
      </Helmet>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className={cx("grid", "wide")}>
            <div className={cx("account-header")}>
              <div className={cx("row")}>
                <div className={cx("col", "l-6", "m-6", "c-6")}>
                  <div className={cx("header-title")}>
                    <p>My Account</p>
                  </div>
                </div>
                <div className={cx("col", "l-6", "m-6", "c-6")}>
                  <div className={cx("action-logout")}>
                    <button className={cx("btn-logout")} onClick={handleLogout}>
                      log out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={cx("grid", "wide")}>
            <div className={cx("row")}>
              <div className={cx("col", "l-6", "m-6", "c-6")}>{renderInfo}</div>
              <div className={cx("col", "l-6", "m-6", "c-6")}>
                <div className={cx("account-content")}>
                  {user && user.level === 1 && (
                    <Button
                      primary
                      outline
                      className={cx("btn-admin")}
                      to={"/admin"}
                    >
                      Go To Admin Page
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AccountPage;
