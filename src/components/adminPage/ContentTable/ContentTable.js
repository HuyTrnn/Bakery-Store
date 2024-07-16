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
import { Button, Table } from "antd";

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
  
  const fecthOrder = () => {
    fetch("https://backpack-nu.vercel.app/api/auth/orders", {
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
        setOrders(data.data);
      });
  };
  useEffect(() => {
    fecthOrder();
  }, []);
  // changeState();


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
        return "Đã hoàn tất";
      case 2:
        return "Đã giao hàng";
      case 3:
        return "Đơn hủy";
    }
    setState(state);
  };

  const filteredOrders = orders.filter((order) =>
    order.user.name.toString().includes(searchTerm)
  );

  const sortOrder = filteredOrders.slice().reverse();
  const displayedOrder = sortOrder.slice(startIndex, endIndex);

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "_id",
      key: "id",
      render: (text, record) => (
        <Link
          className="admin-table__info--data---link"
          onClick={() => handleEditOrder(record)}
          to={`/admin/carts/order/${record._id}`}
        >
          #{record._id.toString().padStart(4, "0")}
        </Link>
      ),
      align: "center",
    },
    {
      title: "Ngày tạo đơn",
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
    },
    {
      title: "Khách hàng",
      dataIndex: "recipient_name",
      key: "recipient_name",
      align: "center",
    },
    {
      title: "Hình thức Thanh toán",
      dataIndex: "payment_method",
      key: "payment_method",
      render: (text) => (text === 0 ? 'Thanh toán tiền mặt' : 'Chuyển khoản'),
      align: "center",
    },
    {
      title: "Tổng đơn",
      dataIndex: "total_amount",
      key: "total_amount",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text) => changeState(text),
      align: "center",
    },
  ];

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
            {/* <input
              type="text"
              className="admin-search__input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm theo tên khách hàng"
            /> */}
            <Button ><a href="https://backpack-nu.vercel.app/api/auth/download/orders">Xuất báo cáo</a></Button>
          </div>{" "}
          <div className="admin-table__info">
              <Table
                className="admin-table__info--show"
                columns={columns}
                dataSource={displayedOrder ? orders : []}
                rowKey="_id"
                pagination={{
                  pageSize: 10,
                }}
              />
            {/* <TablePagination
              style={{ fontSize: "16px" }}
              component="div"
              count={orders.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />{" "} */}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default ContentTable;
