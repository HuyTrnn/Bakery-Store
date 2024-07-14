import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import HeaderContent from "../HeaderAdmin/headerContent";
import { useNavigate } from "react-router-dom";
import Button from "~/components/Button";
import { useSelector } from "react-redux";
import ChangeLangueButton from "~/components/Button/ChangeLangueButton";
import { Flex, Select, Upload } from "antd";
import { FaCircle, FaLanguage, FaStar } from "react-icons/fa";
import { TfiViewList } from "react-icons/tfi";

function EditProduct({ match }) {
  const [types, setTypes] = useState([]);
  const [product, setProduct] = useState([]);
  const [name, setName] = useState();
  const [images, setImages] = useState();
  const [imageUpload, setImageUpload] = useState();
  const [productType, setProductType] = useState();
  const [productTypeName, setProductTypeName] = useState();
  const [description, setDescription] = useState();
  const [promotion, setPromotion] = useState();
  const [slug, setSlug] = useState();
  const [stock, setStock] = useState();
  const [price, setPrice] = useState();
  const [alreadyInStock, setAlreadyInStock] = useState();
  const [key, setKey] = useState('vi');
  const navigate = useNavigate();
  const { id } = useParams();  
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const lang = useSelector((state) => state.language.lang);
  const { status, isAuthenticated, user, accessToken } = useSelector(
    (state) => state.auth
  );
  const [file, setFile] = useState();
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
    fetch(`https://backpack-nu.vercel.app/api/products/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token_type: "bearer",
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": key,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);
        getOldData(data.data);
      })
  };
  useEffect(() => {
    fetchProducts();
  }, [key, id]);

  const getOldData = (data) => {
    setName(data.name);
    setProductType(data.type);
    setImages(data.images[0]);
    setDescription(data.description.detail);
    setStock(data.stock);
    setPrice(data.price);
    setSlug(data.slug)
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
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  function formDataToJson(formData) {
    let jsonObject = {};
    for (const [key, value] of formData.entries()) {
      jsonObject[key] = value;
    }
    return JSON.stringify(jsonObject);
  }



  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('thumbnail', file);
    });
    setUploading(true);
    formData.append(`name[${key}]`, name);
    formData.append("type", productType);
    formData.append("price", price);
    formData.append("unit", productTypeName);
    formData.append("stock", stock);
    formData.append("promotion_price", 0);
    formData.append("new", 1);
    formData.append("slug", slug);
    formData.append(`description[${key}][detail]`, description);

    const myJson = formDataToJson(formData);
    fetch(`https://backpack-nu.vercel.app/api/auth/products/${id}`, {
      method: "PUT",
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "application/json",
        token_type: "bearer",
        Authorization: `Bearer ${accessToken}`,
      },
      body: myJson,
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Chỉnh sửa thành công');
        fetchProducts();
        setFileList([]);
      })
      .catch((error) => {
        alert("Có lỗi trong quá trình thay đổi:", error);
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const onChange = (key) => {
    setKey(key);
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

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
                  <label htmlFor="unit"> Ngôn ngữ </label>{" "}
                  <div className="select-dropdown">
                    <Select
                      showSearch
                      placeholder={<FaLanguage />}
                      optionFilterProp="label"
                      onChange={(value) => onChange(value)}
                      // suffixIcon={<FaLanguage />}
                      options={[
                        {
                          value: "vi",
                          label: (
                            <Flex align="center" gap={4}>
                              <FaStar /> Vietnamese
                            </Flex>
                          ),
                        },
                        {
                          value: "en",
                          label: (
                            <Flex align="center" gap={4}>
                              <TfiViewList /> English
                            </Flex>
                          ),
                        },
                        {
                          value: "ja",
                          label: (
                            <Flex align="center" gap={4}>
                              <FaCircle /> Japanese
                            </Flex>
                          ),
                        },
                      ]}
                    />
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
                <div style={{marginLeft: '6px'}} className="addproduct-form__info--Stock">
                  <label htmlFor="stock"> Loại </label>{" "}
                  <input
                    type="text"
                    name="type"
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                  />{" "}
                </div>{" "}
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
                <div className="addproduct-form__info--price">
                  <label htmlFor="slug"> Tên miền </label>{" "}
                  <input
                    type="text"
                    name="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />{" "}
                </div>{" "}
                
                
             
              
              <div className="addproduct-form__image">
                <label htmlFor="image"> Hình ảnh </label>{" "}
                {/* <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png"
                  onChange={handleImageUpload}
                />{" "} */}
                <Upload {...props}>
                  <Button type="button">Select File</Button>
                </Upload>
                <img
                  style={{ width: "100%", height: "340px" }}
                  src={`${file}`}
                  onChange={handleImageUpload}
                />{" "}
              </div>{" "}
              {/* <div className="addproduct-form__promotion">
                <label htmlFor="description"> Giảm giá </label>{" "}
                <input
                  type="text"
                  placeholder="Giảm giá sản phẩm..."
                  name="promotion_price"
                  value={promotion}
                  onChange={(e) => setPromotion(e.target.value)}
                />{" "}
              </div>{" "} */}
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
