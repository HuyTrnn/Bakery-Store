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
import { Avatar, List } from "antd";

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
    if (user && user.account_level !== 1) {
      navigateRouter("/admin/err");
    }
  }, [isAuthenticated, user, accessToken]);

  const navigateRouter = (url) => {
    navigate(url);
  };

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

  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [topProduct, setTopProduct] = useState();
  const [monthInYear, setMonthInYear] = useState();
  function sortItemsBySales(items) {
    return items.sort((a, b) => b.sales - a.sales);
  }

  const fetchProductsSale = () => {
    fetch("https://backpack-nu.vercel.app/api/auth/products-stock-history", {
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
        setTopProduct(sortItemsBySales(data.data));
      });
  };

  const fetchMonthInYear = () => {
    fetch("https://backpack-nu.vercel.app/api/statistics-monthly", {
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
        setMonthInYear(data.data);
      });
  };

  const fecthOrderDay = () => {
    fetch("https://backpack-nu.vercel.app/api/statistics/day", {
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
        setDay(data.data);
      });
  };
  const fecthOrderMonth = () => {
    fetch("https://backpack-nu.vercel.app/api/statistics/month", {
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
        setMonth(data.data);
      });
  };
  const fecthOrderYear = () => {
    fetch("https://backpack-nu.vercel.app/api/statistics/year", {
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
        setYear(data.data);
      });
  };

  useEffect(() => {
    fecthOrderDay();
    fecthOrderMonth();
    fecthOrderYear();
    fetchProductsSale();
    fetchMonthInYear()
  }, []);

  // useEffect(() => {});

  // useEffect(() => {
  //   if (orders.length > 0) {
  //     getInfo(orders);
  //   }
  // }, [orders]);

  function getInfo(data) {
    var totalOrder = 0;
    var codOrder = 0;
    var orderDone = 0;
    var orderCancel = 0;

    if (orders) {
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
  }
  const codCount =
    orders &&
    orders.reduce((count, item) => {
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

  return (
    <React.Fragment>
      <div className="admin-content">
        <HeaderContent props={"Doanh thu"} />{" "}
        <div className="admin-statistics">
          <div className="admin-statistics__container">
            <div className="admin-statistics__data">
              <label> Tổng doanh thu đơn hàng trong ngày</label>{" "}
              <div className="admin-statistics__data--table">
                <div className="admin-statistics__data--table---value">
                  Tổng số đơn:
                  <span> {day && day.total_order} </span>{" "}
                </div>{" "}
                <div className="admin-statistics__data--table---value">
                  Tổng số đơn hoàn thành:
                  <span> {day && day.total_order_completed} </span>{" "}
                </div>{" "}
                <div className="admin-statistics__data--table---value">
                  Doanh thu dự kiến:
                  <span> {day && day.total_amount} </span>{" "}
                </div>
                <div className="admin-statistics__data--table---value">
                  Doanh thu thực tế:
                  <span> {day && day.total_amount_completed} </span>{" "}
                </div>
              </div>{" "}
            </div>{" "}
            <div className="admin-statistics__data">
              <label> Tổng doanh thu đơn hàng trong tháng </label>{" "}
              <div className="admin-statistics__data--table">
                <div className="admin-statistics__data--table---value">
                  Tổng số đơn:
                  <span> {month && month.total_order} </span>{" "}
                </div>{" "}
                <div className="admin-statistics__data--table---value">
                  Tổng số đơn hoàn thành:
                  <span> {month && month.total_order_completed} </span>{" "}
                </div>{" "}
                <div className="admin-statistics__data--table---value">
                  Doanh thu dự kiến:
                  <span> {month && month.total_amount} </span>{" "}
                </div>
                <div className="admin-statistics__data--table---value">
                  Doanh thu thực tế:
                  <span> {month && month.total_amount_completed} </span>{" "}
                </div>
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
        <div style={{ minWidth: "500px" }} className="admin-statistics__chart">
          <div className="admin-statistics__chart--payment">
            <div className="admin-statistics__data">
              <div className="admin-statistics__data--piechart">
                <label> Top các sản phẩm bán chạy</label>{" "}
                {topProduct && (
                  <List
                    itemLayout="horizontal"
                    dataSource={topProduct.slice(0, 5)}
                    renderItem={(item, index) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              src={item.product_image}
                            />
                          }
                          title={
                            <a href="https://ant.design">{item.product_name}</a>
                          }
                          description={<div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <span>Tổng số lượng: {item.total_quantity}</span>
                            <span>Số lượng bán: {item.sales}</span>
                          </div>}
                        />
                      </List.Item>
                    )}
                  />
                )}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="admin-statistics__chart--payment">
            <div className="admin-statistics__data">
              <div className="admin-statistics__data--piechart">
                <label> Đặt Hàng theo năm</label>{" "}
                <div className="admin-statistics__data--label">
                  <div> Doanh thu </div>{" "}
                </div>{" "}
                {monthInYear && <Chart2 props={monthInYear} />}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* <div
          style={{
            width: "50%",
            padding: "0 30px",
          }}
        >
          <div style={{
            padding: "8px",
            backgroundColor: "#fff",
          }}>
            <List
              itemLayout="horizontal"
              dataSource={dataProduct}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                      />
                    }
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
          </div>
        </div> */}
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
              <label> Doanh thu trong năm</label>{" "}
              <div
                style={{ display: "flex" }}
                className="admin-statistics__data--label "
              >
            
              </div>{" "}
              {monthInYear && <Chart props={monthInYear} />}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </React.Fragment>
  );
}

export default AdminPage;
