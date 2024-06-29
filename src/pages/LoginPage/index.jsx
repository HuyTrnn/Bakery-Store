import { useEffect, useState } from "react";
import styles from "./LoginPage.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { obtainAccessToken, getUser } from "~/store";
import { useThunk } from "~/hooks";
import { Helmet } from "react-helmet-async";

import { Button } from "~/components";

const cx = classNames.bind(styles);

function LoginPage() {
  const [doObtainAccessToken, isLoading, error, data] =
    useThunk(obtainAccessToken);

  const [doGetUser] = useThunk(getUser);

  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.auth);
  const [showMessengerError, setShowMessengerError] = useState(false);

  useEffect(() => {
    if (data) {
      navigate("/");
      localStorage.setItem("accessToken", data.access_token);
      doGetUser(accessToken);
    } else if (error) {
      setShowMessengerError(true);
    } else if (isLoading) {
    }
  }, [
    data,
    navigate,
    accessToken,
    doGetUser,
    setShowMessengerError,
    error,
    isLoading,
  ]);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Vui lòng nhập email")
        .email("Vui lòng nhập đúng định dạng email"),
      password: Yup.string()
        .min(6, "Password phải có ít nhất 6 ký tự")
        .required("Vui lòng nhập password"),
    }),
    onSubmit: (values) => {
      doObtainAccessToken(values);
    },
  });
  return (
    <div className={cx("wrapper")}>
      <Helmet>
        <title>Tài khoản – Have good days</title>
      </Helmet>
      <div className={cx("login")}>
        <h2 className={cx("login-heading")}>Login</h2>
        {showMessengerError && (
          <div className={cx("messenger-error-login")}>
            email or password is incorrect
          </div>
        )}
        <form className={cx("login-form")} onSubmit={formik.handleSubmit}>
          <div className={cx("form-input")}>
            <input
              placeholder="Email"
              type="text"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className={cx("messenger-error")}>{formik.errors.email}</div>
          )}
          <div className={cx("form-input")}>
            <input
              placeholder="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className={cx("messenger-error")}>
              {formik.errors.password}
            </div>
          )}

          <Button primary outline className={cx("btn-login")} type="submit">
            Login
          </Button>
        </form>

        <div className={cx("actions")}>
          <Button className={cx("btn")} to={"/account/forgot-password"}>
            Forgot password
          </Button>

          <Button className={cx("btn")} to={"/register"}>
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
