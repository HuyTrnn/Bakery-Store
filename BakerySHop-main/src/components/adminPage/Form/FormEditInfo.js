import React from "react";
import { useState, useEffect } from "react";
import "./FormEditInfo.scss";
import Button from "~/components/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function FormInfo(data) {
  const [customer, setCustomer] = useState(data.props);
  const [name, setName] = useState(data.props.name);
  const [gender, setGender] = useState(data.props.gender);
  const [phone, setPhone] = useState(data.props.phone_number);
  const [email, setEmail] = useState(data.props.email);
  const [address, setAddress] = useState(data.props.address);
  const [notes, setNotes] = useState(data.props.note);
  const { status, isAuthenticated, user, accessToken } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  // Kiểm tra quyền truy cập và chuyển hướng nếu cần

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
    formData.append("gender", gender);
    formData.append("phone_number", phone);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("note", notes);

    console.log(
      "name",
      name,
      "gender",
      gender,
      "phone_number",
      phone,
      "email",
      email,
      "address",
      address,
      notes
    );
    const myJson = formDataToJson(formData);
    fetch(`  http://localhost:81/api/customer/${data.props.id}`, {
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
        console.error("Error change tpye:", error);
      });
    alert("đã chỉnh sửa");
  };

  return (
    <React.Fragment>
      <form className="panel-body--form" onSubmit={handleSubmit}>
        <div className="form-info">
          <h3 className="form-info__title"> Thông tin giao hàng </h3>{" "}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="form-info__address">
              <label className="form-info__address--label" htmlFor="name">
                Tên khách hàng{" "}
              </label>{" "}
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />{" "}
            </div>{" "}
            <div className="form-info__address">
              <label className="form-info__address--label" htmlFor="name">
                Giới Tính{" "}
              </label>{" "}
              <select
                type="radio"
                name="name"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option> Nam </option> <option> Nữ </option>{" "}
              </select>{" "}
            </div>{" "}
          </div>{" "}
          <div className="form-info__address">
            <label className="form-info__address--label" htmlFor="name">
              Số Điện Thoại{" "}
            </label>{" "}
            <input
              type="text"
              name="phone_number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />{" "}
          </div>{" "}
          <div className="form-info__address">
            <label className="form-info__address--label" htmlFor="name">
              email{" "}
            </label>{" "}
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
          </div>{" "}
        </div>{" "}
        <div className="form-info">
          <h3 className="form-info__title" htmlFor="name">
            Địa chỉ giao hàng{" "}
          </h3>{" "}
          <div className="form-info__ship">
            <textarea
              type="text"
              placeholder="Địa chỉ..."
              name="name"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>{" "}
          </div>{" "}
        </div>{" "}
        <div className="addproduct-form__btn">
          <Button className="btn" type="submit">
            Chỉnh sửa{" "}
          </Button>{" "}
        </div>{" "}
      </form>{" "}
    </React.Fragment>
  );
}

export default FormInfo;
