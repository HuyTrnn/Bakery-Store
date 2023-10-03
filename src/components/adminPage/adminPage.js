import "../GlobalStyles/GlobalStyles.scss";
import "~/components/Header/index";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import HeaderContent from "./HeaderAdmin/headerContent";
import React from "react";
import Chart from "../adminPage/Chart/Chart";
import Chart2 from "../adminPage/Chart/Chart2";
import AdminPieChart from "../adminPage/Chart/PieChart";
import AdminPieChart2 from "../adminPage/Chart/PieChart2";
import { Navigate, useNavigate } from "react-router-dom";
import { MdUpdate } from "react-icons/md";

function AdminPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { status, isAuthenticated, user, accessToken } = useSelector(
    (state) => state.auth
  );

  // Kiểm tra quyền truy cập và chuyển hướng nếu cần
  if (!user) {
    navigate("/login");
  }

  useEffect(() => {
    if (isAuthenticated == false && status == "error") {
      navigateRouter("/login");
    }
    if (user.level !== 1) {
      navigateRouter("/admin/err");
    }
  }, [isAuthenticated, user, accessToken]);

  const navigateRouter = (url) => {
    navigate(url);
  };

  console.log(isAuthenticated, user, accessToken);
  const [orders, setOrders] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderCod, setOrderCod] = useState(0);
  const [orderBank, setOrderBank] = useState([]);
  const [done, setDone] = useState(0);
  const [doneWCod, setDoneWCod] = useState(0);
  const [doneWBank, setDoneWBank] = useState(0);
  const [orderCancel, setOrderCancel] = useState(0);
  const [saleMonth, setSaleMonth] = useState([]);
  const [renevueYear, setRenevueYear] = useState([]);
  const [renevuePreviousYear, setRenevuePreviousYear] = useState([]);

  useEffect(() => {
    const fecthOrder = () => {
      fetch("http://localhost:81/api/order-list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          token_type: "bearer",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setOrders(data.order);
        })
        .then(
          fetch("http://localhost:81/api/sales-report", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
              token_type: "bearer",
              Authorization: `Bearer ${accessToken}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setSaleMonth(data.sales_by_day_of_week);
              setRenevueYear(data.sales_by_month_of_year);
              setRenevuePreviousYear(data.sales_by_month_of_previous_year);
            })
        );
    };
    fecthOrder();
  }, []);

  useEffect(() => {});

  useEffect(() => {
    if (orders.length > 0) {
      getInfo(orders);
    }
  }, [orders]);

  function getInfo(data) {
    var totalOrder = 0;
    var codOrder = 0;
    var orderDone = 0;
    var orderCancel = 0;

    data.forEach((order) => {
      totalOrder = order.total + totalOrder;
      if (order.payment == "COD") {
        codOrder += 1;
      }
      if (order.state == 1 || order.state == 2) {
        orderDone += 1;
      } else if (order.state == 3) {
        orderCancel += 1;
      }
    });
    setOrderTotal(totalOrder);
    setOrderCod(codOrder);
    setOrderBank(orders.length - codOrder);
    setDone(orderDone);
    setOrderCancel(orderCancel);
  }
  const codCount = orders.reduce((count, item) => {
    if (item.state == 1 || (item.state == 2 && item.payment === "COD")) {
      return count + 1;
    }
    return count;
  }, 0);

  const data = {
    orders: orders.length,
    orderDone: done,
    orderTotal: orderTotal,
    orderBank: orderBank,
    orderCod: orderCod,
    orderCancel: orderCancel,
    status: true,
    sale: saleMonth,
  };

  const totalByDay = saleMonth.reduce(
    (total, sale) => total + sale.total_sales,
    0
  );

  const totalPrevious = renevueYear.reduce(
    (total, sale) => total + sale.total_sales,
    0
  );
  const totalNow = renevuePreviousYear.reduce(
    (total, sale) => total + sale.total_sales,
    0
  );
  console.log(totalNow);
  console.log(totalPrevious);
  return (
    <React.Fragment>
      <div className="admin-content">
        <HeaderContent props={"Doanh thu"} />{" "}
        <div className="admin-statistics">
          <div className="admin-statistics__container">
            <div className="admin-statistics__data">
              <label> Tổng đơn </label>{" "}
              <div className="admin-statistics__data--table">
                <div className="admin-statistics__data--table---value">
                  Tổng số đơn:
                  <span> {orders.length} </span>{" "}
                </div>{" "}
                <div className="admin-statistics__data--table---value">
                  Tổng Thu:
                  <span> {orderTotal && orderTotal} </span>{" "}
                </div>{" "}
                <div className="admin-statistics__data--table---value">
                  Hình thức: COD {orderCod}, Banking {orders.length - orderCod}{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            {/* <div className="admin-statistics__data">
                                                                          <label>Tổng doanh thu</label>
                                                                          <div className="admin-statistics__data--table">
                                                                            <div className="admin-statistics__data--table---value">
                                                                              Tổng doanh thu:
                                                                              <span>{orderTotal}</span>
                                                                            </div>
                                                                            <div className="admin-statistics__data--table---value">
                                                                              COD: <span>{orderCod}</span>
                                                                            </div>
                                                                            <div className="admin-statistics__data--table---value">
                                                                              Banking: <span>{orderBank}</span>
                                                                            </div>
                                                                          </div>
                                                                        </div> */}{" "}
            <div className="admin-statistics__data">
              <label> Đơn hoàn tất </label>{" "}
              <div className="admin-statistics__data--table">
                <div className="admin-statistics__data--table---value">
                  Tổng đơn hoàn tất:
                  <span> {done} </span>{" "}
                </div>{" "}
                <div className="admin-statistics__data--table---value">
                  ATM:
                  <span> {done - codCount} </span>{" "}
                </div>{" "}
                <div className="admin-statistics__data--table---value">
                  COD:
                  <span> {codCount} </span>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            {/* <div className="admin-statistics__data">
                                                                          <label>Đơn hủy</label>
                                                                          <div className="admin-statistics__data--table">
                                                                            <div className="admin-statistics__data--table---value">
                                                                              Tổng đơn hủy : {orderCancel}
                                                                            </div>
                                                                            <div className="admin-statistics__data--table---value">
                                                                              Banking: 
                                                                            </div>
                                                                            <div className="admin-statistics__data--table---value">
                                                                              COD:
                                                                            </div>
                                                                          </div>
                                                                        </div> */}{" "}
          </div>{" "}
        </div>{" "}
        <div className="admin-statistics__chart">
          <div className="admin-statistics__chart--payment">
            <div className="admin-statistics__data">
              <div className="admin-statistics__data--piechart">
                <label> Số Lượng Đặt Hàng </label>{" "}
                <div className="admin-statistics__data--label">
                  <span> {orders.length} </span> Đơn hàng{" "}
                  <div> Đơn đã hoàn tất: {done} </div>{" "}
                  <div> Đơn đã hủy: {orderCancel} </div>{" "}
                </div>{" "}
                <div className="admin-statistics__data--ratio">
                  Tỷ lệ hủy đơn:{" "}
                  {
                    <span>
                      {" "}
                      {(
                        (Number(orderCancel) / Number(orders.length)) *
                        100
                      ).toFixed(2)}{" "}
                      %
                    </span>
                  }{" "}
                </div>{" "}
                <AdminPieChart2 props={data} />{" "}
              </div>{" "}
              <div className="admin-statistics__chart--description">
                <div>
                  <span className="description-span ordercod"> </span>Đơn đã
                  hoàn tất{" "}
                </div>{" "}
                <div>
                  <span className="description-span orderbank"> </span>Đơn
                  Banking{" "}
                </div>{" "}
                <div>
                  <span className="description-span ordercancel"> </span>Đơn Hủy{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="admin-statistics__chart--payment">
            <div className="admin-statistics__data">
              <div className="admin-statistics__data--piechart">
                <label> Đặt Hàng theo ngày </label>{" "}
                <div className="admin-statistics__data--label">
                  <div> Doanh thu </div>{" "}
                </div>{" "}
                <Chart2 props={data} />{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div
          style={{
            padding: "70px",
            height: "700px",
            display: "flex",
            justifyContent: "center",
          }}
          className="admin-statistics__chart--payment"
        >
          <div
            style={{ width: "fit-content" }}
            className="admin-statistics__data"
          >
            <div className="admin-statistics__data--chart">
              <label> Đặt Hàng theo ngày </label>{" "}
              <div
                style={{ display: "flex" }}
                className="admin-statistics__data--label "
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "10px",
                  }}
                >
                  <span> Tổng doanh thu hiện tại: {totalNow} </span>{" "}
                  <span> Tổng thu năm trước: {totalPrevious} </span>{" "}
                </div>{" "}
                <div style={{ marginLeft: "50px" }}>
                  <span>
                    {" "}
                    Tỷ lệ tăng trưởng:{" "}
                    {((totalNow / totalPrevious) * 100).toFixed(3)} %{" "}
                  </span>{" "}
                </div>{" "}
              </div>{" "}
              <Chart props={data} />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </React.Fragment>
  );
}

export default AdminPage;
