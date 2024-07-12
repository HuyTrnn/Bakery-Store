import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import HeaderContent from "../HeaderAdmin/headerContent";
import "./billDetail.scss";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Modal from "../Modal/Modal";
import Button from "~/components/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function BillDetail({ order }) {
  const { id } = useParams();
  const [customers, setCustomers] = useState({});
  const [bill, setBill] = useState({});
  const [billDetail, setBillDetail] = useState([]);
  const [product, setProduct] = useState([]);
  const [img, setImg] = useState();
  const [productsUpdated, setProductsUpdated] = useState(false);
  const [status, setStatus] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [customerId, setCustomerId] = useState();
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const { isAuthenticated, user, accessToken } = useSelector(
    (state) => state.auth
  );

  // Kiểm tra quyền truy cập và chuyển hướng nếu cần
  if (!user) {
    navigate("/login");
  }

  useEffect(() => {
    if (isAuthenticated == false) {
      navigateRouter("/login");
    }
    if (user && user.account_level !== 1) {
      navigateRouter("/admin/err");
    }
  }, [isAuthenticated, user, accessToken]);

  const navigateRouter = (url) => {
    navigate(url);
  };
  const fetchOrder = async () => {
    const response = await fetch(`https://backpack-nu.vercel.app/api/auth/orders/${id}`, {
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
      setBill(data.data);
    });
    // setBill(json.bill);
    // setCustomers(json.customer);
    // setBillDetail(json.billDetail);
    // setCustomerId(json.customer.id);
    // if (json.bill.state === 3 || json.bill.state === 2) {
    //   setCheck(true);
    // }
    // return json.billDetail;
  };

  useEffect(() => {
    fetchOrder()
  }, [])

  

  // useEffect(() => {

  //   fetchOrder().then((billDetailArr) => {
  //     const promises = billDetailArr.map((billDetail) => {
  //       return fetch(`http://localhost:81/api/products/${billDetail.id}`).then(
  //         (res) => res.json()
  //       );
  //     });
  //     Promise.all(promises).then((productsArr) => {
  //       setProduct(productsArr);
  //     });
  //   });
  // }, [bill.state]);

  const handleChangeOrder = (state) => {
    fetch(`https://backpack-nu.vercel.app/api/auth/order/cancle/${bill._id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token_type: "bearer",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(`Đã hủy đơn hàng ${id}`);
        fetchOrder()
      })
      .catch((error) => {
        console.error("Error updating state of bill:", error);
      });
  };

  const handleComplete = () => {
    fetch(`https://backpack-nu.vercel.app/api/auth/order/completed/${bill._id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token_type: "bearer",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(`Cập nhật đơn hàng thành công!`);
        fetchOrder()
      })
      .catch((error) => {
        console.error("Error updating state of bill:", error);
      });
  }

  useEffect(() => {
    if (product.length > 0) {
      const imgArr = [];
      const productsUpdatedArr = [];
      product.forEach((item) => {
        imgArr.push(item.image);
        productsUpdatedArr.push(true);
      });
      setImg(imgArr);
      setProductsUpdated(productsUpdatedArr);
    }
  }, [product]);

  function handleModal(data) {
    setStatus(data);
  }

  const changeState = (state) => {
    switch (state) {
      case 0:
        return "Đơn chưa hoàn tất";
      case 1:
        return "Đã hoàn thành";
      case 3:
        return "Đơn hủy";
    }
  };

  const totalQuantity = useMemo(() => {
    return billDetail.reduce((accumulator, item) => {
      return accumulator + item.quantity;
    }, 0);
  }, [billDetail]);

  // getImg();
  // console.log(status);
  console.log(bill);
  return (
    <div style={{ width: "100%" }} className="order-detail__container">
      <div className="admin-content">
        <HeaderContent props={"Thông tin đơn hàng"} />{" "}
        <div className="order">
          <div className="order-title">
            <div className="order-detail">
              <div className="order-detail__wrapper">
                <div className="order-detail__info">
                  <div className="order-detail__info--title"> Mã đơn hàng </div>{" "}
                  <div className="order-detail__info--content"> {id} </div>{" "}
                </div>{" "}
                <div className="order-detail__info">
                  <div className="order-detail__info--title">
                    Trạng thái đơn hàng{" "}
                  </div>{" "}
                  <div className="order-detail__info--content">
                    {" "}
                    {changeState(bill.status)}{" "}
                  </div>{" "}
                </div>{" "}
                <div className="order-detail__info">
                  <div className="order-detail__info--title">
                    Hình thức thanh toán{" "}
                  </div>{" "}
                  <div className="order-detail__info--content">
                    {" "}
                    {bill.payment_method === 0 ? 'Thanh toán tiền mặt' : 'Chuyển khoản'}{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              {check ? (
                <div> </div>
              ) : (
                <div className="order-detail__btn">
                  <div class="dropdown">
                    <Button class="order-detail__btn--change btn">
                      Thao tác{" "}
                    </Button>{" "}
                    <div class="dropdown-content">
                      {/* <a onClick={() => handleChangeOrder(1)}>
                        {" "}
                        Đang giao hàng{" "}
                      </a>{" "} */}
                      <a onClick={() => handleComplete(2)}>
                        {" "}
                        Đã giao hàng{" "}
                      </a>{" "}
                    </div>{" "}
                  </div>{" "}
                  <Button
                    className="order-detail__btn--delete btn"
                    disabled={isDeleting}
                    onClick={() => handleChangeOrder(3)}
                  >
                    Hủy đơn hàng{" "}
                    <span className="order-icon__container">
                      <AiOutlineDelete />
                    </span>{" "}
                  </Button>{" "}
                </div>
              )}{" "}
            </div>{" "}
            <div className="order-time">
              <div className="order-time__date"> {bill.date_order} </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="order-content">
            <div className="order-content-container">
              {" "}
              {/* ------------------------------------------ */}{" "}
              <div style={{ maxWidth: "820px" }}>
                <div
                  style={{ marginBottom: "20px" }}
                  className="order-content-detail"
                >
                  <div className="order-content__cart">
                    <table className="admin-table__info--show">
                      <thead className="admin-table__info--title">
                        <tr className="" style={{ textAlign: "center" }}>
                          <th> Sản phẩm </th> <th> Số lượng </th> <th> Giá </th>{" "}
                          <th> Thành tiền </th>{" "}
                        </tr>{" "}
                      </thead>{" "}
                      <tbody className="admin-table__info--data">
                        {" "}
                        {bill.products &&
                          bill.products.map((item, i) => (
                            <tr key={i}>
                              <td
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <span style={{ flex: 2 }}> {item.product_name} </span>{" "}
                                <div style={{ flex: 1 }}>
                                  <img
                                    className="img-product"
                                    src={`${item.img}`}
                                  />{" "}
                                </div>{" "}
                              </td>{" "}
                              <td style={{ textAlign: "center" }}>
                                {" "}
                                {item.quantity}{" "}
                              </td>{" "}
                              <td> {Number(item.price)} </td>{" "}
                              <td> {item.quantity * item.price} </td>{" "}
                            </tr>
                          ))}{" "}
                      </tbody>{" "}
                    </table>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="order-content-detail">
                  <h3> Trạng thái đơn </h3>{" "}
                  <div className="order-content__bill">
                    <div className="order-content__bill--note">
                      <strong> Ghi chú cho đơn hàng </strong>{" "}
                      <textarea value={bill.note} placeholder="Thêm ghi chú cho đơn hàng">
                        
                      </textarea>{" "}
                      <Button className="order-detail__btn--delete btn">
                        Cập nhật{" "}
                      </Button>{" "}
                    </div>{" "}
                    <div className="order-content__bill--detail">
                    
                      <div className="order-content__bill--detail---item">
                        <div>
                          Tổng tiền hàng <p> {bill.total_amount} </p>{" "}
                        </div>{" "}
                      </div>{" "}
                      {/* <div className="order-content__bill--detail---item">
                        <div>
                          Phí Ship <p> 0 đ </p>{" "}
                        </div>{" "}
                      </div>{" "} */}
                      <div className="order-content__bill--detail---item">
                        <div>
                          Tổng giá trị thanh toán <p> {bill.total_amount} </p>{" "}
                        </div>{" "}
                      </div>{" "}
                      <div className="order-content__bill--detail---item">
                        <div>
                          Hình thức thanh toán <p> {bill.payment_method === 0 ? 'Thanh toán tiền mặt' : 'Chuyển khoản'} </p>{" "}
                        </div>{" "}
                      </div>{" "}
                      <div className="order-content__bill--detail---item">
                        <div>
                          Đã thanh toán <p> 0 đ </p>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              {/* ------------------------------------------------------ */}{" "}
              <div className="order-content__address">
                <div className="order-content__address--title">
                  <h3> Thông tin người mua </h3>{" "}
                </div>{" "}
                <div className="order-content__address--customer">
                  <p> {bill.recipient_name} </p> <p> {bill.recipient_phone} </p>{" "}
                  <div className="order-content__address--customer---ordered">
                    <span> Đã đặt </span> <b> 3 đơn hàng </b>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="order-content__address--ship">
                  <address>
                    <div className="order-content__address--ship---edit">
                      <div>
                        <h4> Thông tin giao hàng </h4>{" "}
                        <button onClick={(e) => setStatus(false)}>
                          <AiOutlineEdit />
                        </button>{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="order-content__address--ship---customer">
                      <div> {bill.recipient_name} </div>{" "}
                      <div> {bill.recipient_phone} </div>{" "}
                    </div>{" "}
                    <div className="order-content__address--ship---address">
                      <h4> Địa chỉ giao hàng </h4> <p> {bill.shipping_address} </p>{" "}
                    </div>{" "}
                  </address>{" "}
                </div>{" "}
                <div className="order-content__address--note">
                  <h4> Ghi chú về khách hàng </h4> <div> {bill.note} </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {status ? null : (
        <div>
          <Modal onStatus={handleModal} props={bill} />{" "}
        </div>
      )}{" "}
    </div>
  );
}

export default BillDetail;
