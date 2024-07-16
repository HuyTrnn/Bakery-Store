import { useEffect, useState, useRef, useLayoutEffect } from "react";
import HeaderContent from "../HeaderAdmin/headerContent";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import DataTable from "datatables.net-dt";
import TablePagination from "@mui/material/TablePagination";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../adminPage.scss";
import { useSelector } from "react-redux";
import { Button, Table } from "antd";
import { render } from "@testing-library/react";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);
  const navigate = useNavigate();
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
  const fetchProducts = () => {
    setLoading(true)
    fetch("https://backpack-nu.vercel.app/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  function handleEditProduct(product) {
    const path = `/admin/editproduct/${product.id}`;
    navigate(path);
  }

  const alertDelete = (name, id) => {
    if (window.confirm(`Bạn chắc chắn muốn xóa sản phẩm: ${name}`)) {
      handleDelete(id);
    } else {
      alert("không xóa nữa");
    }
  };

  const handleDelete = (id) => {
    fetch(`https://backpack-nu.vercel.app/api/auth/products/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token_type: "bearer",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with the response, like update the products state
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
    window.location.reload();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Ảnh",
      dataIndex: "images",
      key: "images",
      render: (value) => (
        <img alt="img" className="img-product" src={`${value[0]}`} />
      ),
    },
    {
      title: 'Giá',
      dataIndex: "price",
      key: "price",
    },
    {
      title: 'Tồn',
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: 'Loại',
      dataIndex: "type",
      key: "type",
    },
    {
      title: '',
      dataIndex: "action",
      key: "ctiona",
      render: (value,option) => (<div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link
          style={{ marginRight: "6px" }}
          onClick={() => handleEditProduct(option)}
          to={`/admin/editproduct/${option._id}`}
        >
          <FiEdit />
        </Link>{" "}
        <AiOutlineDelete
          onClick={() =>
            alertDelete(option.name, option._id)
          }
        />{" "}
      </div>)
    },
  ];

  return (
    <div className="products-page__container" style={{ width: "100%" }}>
      <div className="admin-content">
        <HeaderContent props="Sản phẩm" />
        <div className="admin-table">
          <div className="admin-table__container">
            <div className="admin-table__header">
              <h3 className="admin-table__title"> Danh sách sản phẩm </h3>{" "}
              <div className="admin-table__btn">
                <button className="admin-table__btn--week"> </button>{" "}
                <button className="admin-table__btn--month"> </button>{" "}
              </div>{" "}
            </div>{" "}
            <div
              style={{
                display: "flex",
                gap: "6px",
                float: "right",
                marginBottom: "4px",
              }}
            >
              <Button>
                <a
                  target="_blank"
                  href="https://backpack-nu.vercel.app/api/download/stock-out-history"
                >
                  Xuất kho
                </a>
              </Button>
              <Button>
                <a
                  target="_blank"
                  href="https://backpack-nu.vercel.app/api/download/stock-history"
                >
                  Tồn kho
                </a>
              </Button>
              <Button>
                <a
                  target="_blank"
                  href="https://backpack-nu.vercel.app/api/download/stock-in-history"
                >
                  Nhập kho
                </a>
              </Button>
            </div>
            <div className="admin-table__info">
            <Table
                dataSource={displayedProducts}
                columns={columns}
                loading={loading}
                pagination={{
                  pageSize: 10,
                }}
              />
              {/* <TablePagination
                style={{ fontSize: "16px" }}
                component="div"
                count={products.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />{" "} */}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default ProductsPage;
