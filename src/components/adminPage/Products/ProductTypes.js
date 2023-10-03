import { useEffect, useState } from "react";
import HeaderContent from "../HeaderAdmin/headerContent";
import TablePagination from "@mui/material/TablePagination";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "~/components/Button"

function ProductTypes() {
  const [productType, setproductType] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedType = productType.slice(startIndex, endIndex);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = () => {
      fetch("http://localhost:81/api/products-type")
        .then((res) => res.json())
        .then((data) => {
          setproductType(data.productByType);
          setLoading(false);
        });
    };
    fetchProducts();
  }, []);

  const alertDelete = (name, id) => {
    if (window.confirm(`Bạn chắc chắn muốn xóa loại sản phẩm: ${name}`)) {
      handleDelete(id);
      navigate("/admin/productbytypes")
    } else {
      alert("không xóa nữa");
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:81/api/products-type/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // do something with the response, like update the products state
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  function handleEditType(type) {
    const path = `/admin/productbytypes/edit/${type.id}`;
    navigate(path);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div style={{ width: "100%" }} className="product-types-container">
      <div className="admin-content">
        <HeaderContent props="Loại Sản phẩm" />
        <div style={{ padding: "0 32px" }} className="admin-table__container">
          <div className="admin-table__header">
            <h3 className="admin-table__title">Danh sách loại sản phẩm</h3>
            <div className="admin-table__btn">
              <Button
                className="order-detail__btn--delete btn"
              >
                <Link to="/admin/productbytypes/add">Thêm loại</Link>
              </Button>
            </div>
          </div>
          <p className="admin-table__description">Description</p>
          <div className="admin-table__info">
            <table className="admin-table__info--show">
              <thead className="admin-table__info--title">
                <tr style={{ textAlign: "center" }}>
                  <th>Mã loại</th>
                  <th>Tên</th>
                  <th>Ảnh minh họa</th>
                  <th>Chú thích</th>
                  <th>Chỉnh sửa</th>
                </tr>
              </thead>

              <tbody className="admin-table__info--data">
                {loading ? (
                  <div></div>
                ) : (
                  displayedType.map((type, i) => (
                    <tr style={{ textAlign: "center" }} key={type.id}>
                      <td>{type.id}</td>
                      <td>{type.name}</td>
                      <td style={{ width: "120px" }}>
                        <img
                          style={{ height: "120px" }}
                          srcclassName="img-product"
                          src={`data:image/png;base64,${type.image}`}
                        />
                      </td>
                      <td>{type.description}</td>
                      <td>
                        <Link
                          onClick={() => handleEditType(type)}
                          to={`/admin/productbytypes/edit/${type.id}`}
                        >
                          <FiEdit />
                        </Link>
                        <AiOutlineDelete
                            onClick={() =>
                              alertDelete(type.name, type.id)
                            }
                          />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <TablePagination
              style={{ fontSize: "16px" }}
              component="div"
              count={productType.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductTypes;
