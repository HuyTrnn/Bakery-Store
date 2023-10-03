import "./contentAdmin.scss";
import { MdOutlineCalendarViewMonth } from "react-icons/md";
import { BsCalendarWeek } from "react-icons/bs";
import HeaderContent from "../HeaderAdmin/headerContent";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import TablePagination from "@mui/material/TablePagination";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ContentTable() {
  const [orders, setOrders] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [state, setState] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const { isAuthenticated, user, accessToken } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fecthOrder = () => {
      fetch("http://localhost:81/api/order-list")
        .then((res) => res.json())
        .then((data) => {
          setOrders(data.order);
        });
    };
    changeState();
    fecthOrder();
  }, []);

  console.log(isAuthenticated, user, accessToken);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleEditOrder(order) {
    const path = `/admin/carts/order/${order.id}`;
    navigate(path);
  }

  const changeState = (state) => {
    switch (state) {
      case 0:
        return "Đơn chưa hoàn tất";
      case 1:
        return "Đang giao hàng";
      case 2:
        return "Đã giao hàng";
      case 3:
        return "Đơn hủy";
    }
    setState(state);
  };

  const filteredOrders = orders.filter((order) =>
    order.customer_name.toString().includes(searchTerm)
  );

  const sortOrder = filteredOrders.slice().reverse();
  const displayedOrder = sortOrder.slice(startIndex, endIndex);

  return (
    <div className="admin-content">
      <HeaderContent props={"Sản phẩm"} />{" "}
      <div className="admin-table">
        <div className="admin-table__container">
          <div className="admin-table__header">
            <h3 className="admin-table__title"> Tổng đơn hàng </h3>{" "}
            <div className="admin-table__btn">
              <button className="admin-table__btn--week"> </button>{" "}
              <button className="admin-table__btn--month"> </button>{" "}
            </div>{" "}
          </div>{" "}
          <div className="admin-table__search">
            <p className="admin-table__search--description"> Danh sách đơn </p>{" "}
            <input
              type="text"
              className="admin-search__input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm theo tên khách hàng"
            />
          </div>{" "}
          <div className="admin-table__info">
            <table className="admin-table__info--show">
              <thead className="admin-table__info--title">
                <tr style={{ textAlign: "center" }}>
                  <th> Mã đơn hàng </th> <th> Ngày tạo đơn </th>{" "}
                  <th> Khách hàng </th> <th> Hình thức Thanh toán </th>{" "}
                  <th> Tổng đơn </th> <th> Trạng thái </th>{" "}
                </tr>{" "}
              </thead>
              <tbody className="admin-table__info--data">
                {" "}
                {displayedOrder ? (
                  displayedOrder.map((order) => (
                    <tr style={{ textAlign: "center" }} key={order.id}>
                      <Link
                        className="admin-table__info--data---link"
                        onClick={() => handleEditOrder(order)}
                        to={`/admin/carts/order/${order.id}`}
                      >
                        #{order.id.toString().padStart(4, "0")}{" "}
                      </Link>{" "}
                      <td> {order.date_order} </td>{" "}
                      <td> {order.customer_name} </td>{" "}
                      <td> {order.payment} </td> <td> {order.total} </td>{" "}
                      <td> {changeState(order.state)} </td>{" "}
                    </tr>
                  ))
                ) : (
                  <tr> Không có đơn hàng nào </tr>
                )}{" "}
              </tbody>{" "}
            </table>{" "}
            <TablePagination
              style={{ fontSize: "16px" }}
              component="div"
              count={orders.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default ContentTable;
