import React from "react";
import { useState, useEffect } from "react";
// import "./FormEditInfo.scss";
import Button from "~/components/Button";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function AddStaff(data) {
  const [staff, setStaff] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [job, setJob] = useState();
  const [gender, setGender] = useState();
  const [age, setAge] = useState();
  const [images, setImages] = useState();
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      //   setImage(reader.result);
      const base64String = reader.result.split(",")[1];
      setImages(base64String);
    };
  };

  const navigateRouter = (url) => {
    navigate(url);
  };
  // useEffect(() => {
  //   function getData() {
  //

  //   }
  //   getData();
  // }, []);
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
    formData.append("phone_number", phone);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("gender", gender);
    formData.append("age", age);
    formData.append("job_title", job);
    formData.append("image", images);

    const myJson = formDataToJson(formData);
    fetch(`http://localhost:81/api/employees`, {
      method: "POST",
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
        console.error("Error change tpye:", error);
      });
    alert("đã thêm");
  };

  return (
    <div className="addproducts-page">
      <div className="admin-content">
        <div className="admin-content__form">
          <h1> Thêm nhân viên </h1>{" "}
          <div className="addproduct-form">
            <form onSubmit={handleSubmit}>
              <div className="addproduct-form__heading">
                <div className="addproduct-form__heading--name">
                  <label htmlFor="name"> Tên nhân viên </label>{" "}
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    onInvalid="this.setCustomValidity('Vui lòng nhập trường này')"
                  />
                </div>{" "}
              </div>{" "}
              <div className="addproduct-form__info">
                <div className="addproduct-form__info--price">
                  <label htmlFor="unit_price"> Số điện thoại </label>{" "}
                  <input
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    onInvalid="this.setCustomValidity('Vui lòng nhập trường này')"
                  />
                </div>{" "}
                <div className="addproduct-form__info--Stock">
                  <label htmlFor="stock"> Email </label>{" "}
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    onInvalid="this.setCustomValidity('Vui lòng nhập trường này')"
                  />
                </div>{" "}
              </div>{" "}
              <div className="addproduct-form__image">
                <label htmlFor="image"> Hình ảnh </label>{" "}
                {/* <input type="file" accept="image/jpeg,image/png" name="image" onChange={handleInputChange} /> */}{" "}
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleImageUpload}
                  required
                  onInvalid="this.setCustomValidity('Vui lòng nhập trường này')"
                />{" "}
                {/* <img style={{ width: "100%" }} src={image} />{" "} */}{" "}
              </div>{" "}
              <div
                style={{ marginTop: "16px" }}
                className="addproduct-form__new"
              >
                <label htmlFor="description"> Tuổi </label>{" "}
                <input
                  type="text"
                  placeholder="Chú thích về sản phẩm..."
                  name="age"
                  // value={alreadyInStock}
                  checked
                  onChange={(e) => setAge(e.target.value)}
                />{" "}
              </div>{" "}
              <div className="addproduct-form__unit_price">
                <label htmlFor="description"> Giới tính </label>{" "}
                <input
                  type="text"
                  placeholder="Chú thích về sản phẩm..."
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  onInvalid="this.setCustomValidity('Vui lòng nhập trường này')"
                />
              </div>{" "}
              <div className="addproduct-form__btn">
                <Button type="submit"> Thêm </Button>{" "}
              </div>{" "}
            </form>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default AddStaff;
