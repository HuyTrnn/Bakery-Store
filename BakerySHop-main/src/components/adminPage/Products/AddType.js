import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import HeaderContent from "../HeaderAdmin/headerContent";
import { MdUpdate } from "react-icons/md";
import Button from "~/components/Button"
import "./ProductAll.scss";

function AddType({ match }) {
  const navigate = useNavigate();
  const [types, setTypes] = useState([])
  const [name, setName] = useState();
  const [images, setImages] = useState();
  const [image, setImage] = useState();
  const [description, setDescription] = useState();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", images);
    formData.append("description", description);
    const myJson = formDataToJson(formData);
    console.log(myJson);
    fetch(` http://localhost:81/api/products-type`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: myJson,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // the newly added product object returned by the API
      })
      .catch((error) => {
        console.error("Error change tpye:", error);
      });
    alert("đã chỉnh sửa");
    // navigate("/admin/productbytypes");
  };

  return (
    <div className="productTypeEdit-page">
      <div className="admin-content">
        <HeaderContent props={"Loại sản phẩm"} />
        <div className="admin-content__form">
          <h1>Thêm loại sản phẩm</h1>
          <div className="addproduct-form">
            <form style={{width: "100%"}} onSubmit={handleSubmit}>
              <div className="addproduct-form__heading">
                <div className="addproduct-form__heading--name">
                  <label htmlFor="name">Tên Loại</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="addproduct-form__image">
                <label htmlFor="image">Hình ảnh</label>
                <input type="file"  accept="image/jpeg,image/png" onChange={handleImageUpload} required />
                <img style={{width: '100%', height: '500px'}} src={image}></img>
              </div>

              <div className="addproduct-form__description">
                <label htmlFor="description">Chú thích</label>
                <textarea 
                  type="text"
                  placeholder="Chú thích về sản phẩm..."
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                >{types.description}</textarea>
              </div>
              <div></div>
              <div></div>
              <div className="addproduct-form__btn">
                <Button type="submit">Chỉnh sửa</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddType;
