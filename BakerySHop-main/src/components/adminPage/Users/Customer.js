import { useEffect, useState } from "react";
import React from "react";
import HeaderContent from "../HeaderAdmin/headerContent";
import { AiOutlineDelete, AiOutlineArrowRight } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import Modal from "../Modal/Modal";

import "./User.scss";
import TablePagination from "@mui/material/TablePagination";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedCustomers = customers.slice(startIndex, endIndex);
  const navigate = useNavigate();
  const [status, setStatus] = useState(true);

  const { isAuthenticated, user, accessToken } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const fetchCustomers = () => {
      fetch("http://localhost:81/api/customer")
        .then((res) => res.json())
        .then((data) => {
          setCustomers(data.customer);
          setLoading(false);
        });
    };
    fetchCustomers();
  }, []);
  const toggleDetails = (id) => {
    setShowDetails((prevShowDetails) =>
      prevShowDetails.includes(id)
        ? prevShowDetails.filter((staffId) => staffId !== id)
        : [...prevShowDetails, id]
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:81/api/customer/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        token_type: "bearer",
        Authorization: `Bearer ${accessToken}`,
        // "access_token": accessToken,
        // Authorization: 'Bearer <accessToken>',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with the response, like update the products state
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const alertDelete = (name, id) => {
    if (window.confirm(`Bạn chắc chắn muốn xóa khách hàng: ${name}`)) {
      handleDelete(id);
      navigate("/admin/customers");
    } else {
      alert("không xóa nữa");
    }
  };
  console.log(customers);

  const filteredCustomer = customers.filter((customer) =>
    customer.name.toString().includes(searchTerm)
  );

  // const sortOrder = filteredCustomer.slice().reverse();
  const displayedOrder = filteredCustomer.slice(startIndex, endIndex);

  function handleModal(data) {
    setStatus(data);
  }

  return (
    <div className="user__container" style={{ width: "100%" }}>
      <div className="admin-content">
        <HeaderContent props="Sản phẩm" />
        <div className="admin-table">
          <div className="admin-table__container">
            <div className="admin-table__header">
              <h3 className="admin-table__title"> Danh sách khách hàng </h3>{" "}
              <div className="admin-table__btn">
                <button className="admin-table__btn--show"> </button>{" "}
              </div>{" "}
            </div>{" "}
            <div className="admin-table__search">
              <p className="admin-table__search--description">
                {" "}
                Danh sách khách hàng{" "}
              </p>{" "}
              <input
                type="text"
                className="admin-search__input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm theo tên khách hàng"
              />
            </div>{" "}
            <p className="admin-table__description"> Khách hàng </p>{" "}
            <div className="admin-table__info">
              <table className="admin-table__info--show">
                <thead className="admin-table__info--title">
                  <tr style={{ textAlign: "center" }}>
                    <th> Tên </th> <th> Số điện thoại </th> <th> Địa chỉ </th>{" "}
                    <th> Email </th> <th> </th>{" "}
                  </tr>{" "}
                </thead>
                <tbody className="admin-table__info--data">
                  {" "}
                  {loading ? (
                    <div> </div>
                  ) : (
                    displayedOrder.map((customer) => (
                      <React.Fragment key={customer.id}>
                        <tr style={{ textAlign: "center" }}>
                          <td> {customer.name} </td>{" "}
                          <td> {customer.phone_number} </td>{" "}
                          <td> {customer.address} </td>{" "}
                          <td> {customer.email} </td>{" "}
                          <td>
                            {" "}
                            <AiOutlineArrowRight
                              onClick={() => toggleDetails(customer.id)}
                            />
                            <AiOutlineDelete
                              onClick={() =>
                                alertDelete(customer.name, customer.id)
                              }
                            />
                          </td>
                        </tr>{" "}
                        {status ? null : (
                          <div>
                            <Modal onStatus={handleModal} props={customer} />{" "}
                          </div>
                        )}{" "}
                        {showDetails.includes(customer.id) && (
                          <tr>
                            <td colSpan={6}>
                              <div
                                className={`staff-info ${
                                  showDetails.includes(customer.id)
                                    ? "show"
                                    : ""
                                }`}
                              >
                                <div className="staff-info__detail">
                                  <p> {customer.name}: </p>{" "}
                                  <p> Tuổi: {customer.age} </p>{" "}
                                  {/* <p>Giới tính: Nam</p> */}{" "}
                                  <p> SĐT: {customer.phone_number} </p>{" "}
                                  <p> Email: {customer.email} </p>{" "}
                                  <p> Địa chỉ: {customer.address} </p>{" "}
                                </div>{" "}
                                <div>
                                  <FiEdit onClick={(e) => setStatus(false)} />{" "}
                                  Chỉnh sửa{" "}
                                </div>{" "}
                              </div>{" "}
                            </td>{" "}
                          </tr>
                        )}{" "}
                      </React.Fragment>
                    ))
                  )}{" "}
                </tbody>{" "}
              </table>
              <TablePagination
                style={{ fontSize: "16px" }}
                component="div"
                count={customers.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default Customers;
