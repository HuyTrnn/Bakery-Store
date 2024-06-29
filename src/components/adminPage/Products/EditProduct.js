import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import HeaderContent from "../HeaderAdmin/headerContent";
import { useNavigate } from "react-router-dom";
import Button from "~/components/Button";
import { useSelector } from "react-redux";

function EditProduct({ match }) {
  const [types, setTypes] = useState([]);

  const [product, setProduct] = useState([]);
  const [name, setName] = useState();
  const [images, setImages] = useState();
  const [image, setImage] = useState();
  const [productType, setProductType] = useState();
  const [productTypeName, setProductTypeName] = useState();
  const [description, setDescription] = useState();
  const [promotion, setPromotion] = useState();
  const [stock, setStock] = useState();
  const [price, setPrice] = useState();
  const [alreadyInStock, setAlreadyInStock] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

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
    if (user.account_level !== 1) {
      navigateRouter("/admin/err");
    }
  }, [isAuthenticated, user, accessToken]);

  const navigateRouter = (url) => {
    navigate(url);
  };
  useEffect(() => {
    const fetchProducts = () => {
      fetch(`https://backpack-nu.vercel.app/api/products/${id}`, {})
        .then((res) => res.json())
        .then((data) => {
          setProduct(data.data);
          getOldData(data.data);
        })
        .then((data) => {
          fetch("http://localhost:81/api/products-type")
            .then((res) => res.json())
            .then((data) => {
              setTypes(data.productByType);
            });
        });
    };
    fetchProducts();
  }, []);

  const getOldData = (data) => {
    setName(data.name);
    setProductType(data.type);
    setImages(data.images[0]);
    setDescription(data.description.detail);
    setStock(data.stock);
    setPrice(data.price);
    setProductTypeName(data.unit);
    setPromotion(data.promotion_price);
    setAlreadyInStock(data.new);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setImages(base64String);
    };
  };

  function formDataToJson(formData) {
    let jsonObject = {};
    for (const [key, value] of formData.entries()) {
      jsonObject[key] = value;
    }
    return JSON.stringify(jsonObject);
  }

  async function updateProduct() {
    // You can check the response from the API in the console
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("id_type", productType);
    formData.append("unit_price", price);
    formData.append("unit", productTypeName);
    formData.append("stock", stock);
    formData.append("image", images);
    formData.append("promotion_price", 0);
    formData.append("new", 1);
    formData.append("description", description);
    const myJson = formDataToJson(formData);
    console.log(
      "name :",
      name,
      "id_type",
      productType,
      "unit",
      productTypeName,
      "price",
      price,
      "stock",
      stock,
      "img",
      // images,
      promotion,
      alreadyInStock,
      description,
      productType
    );
    fetch(`http://localhost:81/api/products/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token_type: "bearer",
        Authorization: `Bearer ${accessToken}`,
      },
      body: myJson,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // the newly added product object returned by the API
      })
      .catch((error) => {
        alert("Có lỗi trong quá trình thay đổi:", error);
      });
    alert("đã chỉnh sửa");

    window.location.reload();
  }
  console.log(product);

  const loading = true;
  return (
    <div className="addproducts-page">
      <div className="admin-content">
        <HeaderContent props={"Sửa sản phẩm"} />{" "}
        <div className="admin-content__form">
          <h1> Sửa sản phẩm </h1>{" "}
          <div className="addproduct-form">
            <form onSubmit={handleSubmit}>
              <div className="addproduct-form__heading">
                <div className="addproduct-form__heading--name">
                  <label htmlFor="name"> Tên sản phẩm </label>{" "}
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />{" "}
                </div>{" "}
                <div className="addproduct-form__heading--unit">
                  <label htmlFor="unit"> Loại sản phẩm </label>{" "}
                  <div className="select-dropdown">
                    <select
                      style={{ width: "100%" }}
                      name="unit"
                      value={productType}
                      onChange={(e) => setProductType(e.target.value)}
                    >
                      {types.map((type, i) => (
                        <option key={type.id} value={type.id}>
                          {" "}
                          {type.name}{" "}
                        </option>
                      ))}{" "}
                    </select>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              <div className="addproduct-form__info">
                <div className="addproduct-form__info--price">
                  <label htmlFor="unit_price"> Giá thành </label>{" "}
                  <input
                    type="text"
                    name="unit_price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />{" "}
                </div>{" "}
                <div className="addproduct-form__info--Stock">
                  <label htmlFor="stock"> Số lượng </label>{" "}
                  <input
                    type="text"
                    name="stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />{" "}
                </div>{" "}
              </div>{" "}
              <div className="addproduct-form__image">
                <label htmlFor="image"> Hình ảnh </label>{" "}
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleImageUpload}
                />{" "}
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={`${images}`}
                  onChange={handleImageUpload}
                />{" "}
              </div>{" "}
              <div className="addproduct-form__description">
                <label htmlFor="description"> Chú thích </label>{" "}
                <textarea
                  type="text"
                  placeholder="Chú thích về sản phẩm..."
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>{" "}
              </div>{" "}
              <div className="addproduct-form__promotion">
                <label htmlFor="description"> Giảm giá </label>{" "}
                <input
                  type="text"
                  placeholder="Giảm giá sản phẩm..."
                  name="promotion_price"
                  value={promotion}
                  onChange={(e) => setPromotion(e.target.value)}
                />{" "}
              </div>{" "}
              <div className="addproduct-form__btn">
                <Button type="submit"> Cập nhật </Button>{" "}
              </div>{" "}
            </form>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default EditProduct;
