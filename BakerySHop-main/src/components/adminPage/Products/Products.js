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

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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
    if (user.level !== 1) {
      navigateRouter("/admin/err");
    }
  }, [isAuthenticated, user, accessToken]);

  const navigateRouter = (url) => {
    navigate(url);
  };
  useEffect(() => {
    const fetchProducts = () => {
      fetch("http://localhost:81/api/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
          setLoading(false);
        });
    };
    fetchProducts();
    console.log("sản phẩm");
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
    fetch(`http://localhost:81/api/products/${id}`, {
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
            <p className="admin-table__description"> Description </p>{" "}
            <div className="admin-table__info">
              <table className="admin-table__info--show">
                <thead className="admin-table__info--title">
                  <tr style={{ textAlign: "center" }}>
                    <th> Mã sản phảm </th> <th> </th> <th> Tên </th>{" "}
                    <th> Giá thành </th> <th> Tồn </th> <th> Loại </th>{" "}
                    <th> Chỉnh sửa </th>{" "}
                  </tr>{" "}
                </thead>{" "}
                <tbody className="admin-table__info--data">
                  {" "}
                  {loading ? (
                    <div> </div>
                  ) : (
                    displayedProducts.map((product, index) => (
                      <tr style={{ textAlign: "center" }} key={product.id}>
                        <td> #{product.id.toString().padStart(3, "0")} </td>{" "}
                        <td style={{ width: "100px" }}>
                          <img
                            className="img-product"
                            src={`data:image/png;base64,${product.image}`}
                          />{" "}
                        </td>{" "}
                        <td> {product.name} </td>{" "}
                        <td> {product.unit_price} </td>{" "}
                        <td> {product.stock} </td> <td> {product.unit} </td>{" "}
                        <td>
                          <Link
                            onClick={() => handleEditProduct(product)}
                            to={`/admin/editproduct/${product.id}`}
                          >
                            <FiEdit />
                          </Link>{" "}
                          <AiOutlineDelete
                            onClick={() =>
                              alertDelete(product.name, product.id)
                            }
                          />{" "}
                        </td>{" "}
                      </tr>
                    ))
                  )}{" "}
                </tbody>{" "}
              </table>{" "}
              <TablePagination
                style={{ fontSize: "16px" }}
                component="div"
                count={products.length}
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

export default ProductsPage;
