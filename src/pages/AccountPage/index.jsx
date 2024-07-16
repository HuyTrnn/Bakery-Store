import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useThunk } from "~/hooks";
import classNames from "classnames/bind";
import styles from "./account.module.scss";
import { logout } from "~/store";
import { Helmet } from "react-helmet-async";
import { Button, LoadingComponent } from "~/components";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Table } from "antd";
import axios from "axios";

const cx = classNames.bind(styles);
function AccountPage() {
  const [doLogout, isLoading, error, data] = useThunk(logout);
  const navigate = useNavigate();
  const { isAuthenticated, user, accessToken } = useSelector(
    (state) => state.auth
  );
  const { t } = useTranslation();
  const [ownerOrder, setOwnerOrder] = useState([]);
  const [loading, setLoading] = useState(false)

  const getOrderUser = () => {
    setLoading(true)

    const response = axios.get(
      `https://backpack-nu.vercel.app/api/auth/user/${user._id}/orders`
    ).then(data =>{
      setLoading(false)
      setOwnerOrder(data.data.data)
    } )
      .catch((error) => {
        console.error(error) 
        setLoading(false)
      });
  }


  useEffect(() => {
    getOrderUser()
  }, [isAuthenticated, navigate, isLoading, error, data]);

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

  let columns = [
    {
      title: t("date"),
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: t("receive"),
      dataIndex: "recipient_name",
      key: "recipient_name",
    },
    {
      title: t("phonenumber"),
      dataIndex: "recipient_phone",
      key: "recipient_phone",
    },
    {
      title: t("BankOrCod"),
      dataIndex: "payment_method",
      key: "payment_method",
      render: (value) => (value === 0 ? "Thanh toán tiền mặt" : "Chuyển khoản"),
    },
    {
      title: t("totalCost"),
      dataIndex: "total_amount",
      key: "total_amount",
    },
  ];

  const columnsInfo = [
    {
      title: '',
      dataIndex: "product_name",
      key: "product_name",
      width: 150,
    },
    {
      title: '',
      dataIndex: "img",
      width: 150,
      key: "img",
      render: (value, index) => <img style={{width: '50px', height: '50px'}} alt="img" src={value} />
    },
    {
      title: '',
      dataIndex: "price",
      width: 150,
      key: "price",
    },
    {
      title: '',
      dataIndex: "quantity",
      width: 150,
      key: "quantity",
    },
  ]

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
        <title>Tài khoản – Have good days</title>
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
                  {user && user.account_level === 1 && (
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

          <div>
            <div className={cx("col", "l-6", "m-6", "c-6")}>
              <div className={cx("action-logout")}>
                <button className={cx("btn-logout")} onClick={handleLogout}>
                  Lịch sử đơn đặt hàng
                </button>
              </div>
            </div>
            <div>
              {/* {ownerOrder.map((item,index) => (
                      <div key={index}>
                        test
                      </div>
                    ))} */}
              <Table
                dataSource={ownerOrder}
                columns={columns}
                loading={loading}
                expandable={{
                  expandedRowRender: (record) => (
                    <Table 
                      dataSource={record.products}
                      columns={columnsInfo}
                    />
                  ),
                  rowExpandable: (record) => record.name !== "Not Expandable",
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AccountPage;
