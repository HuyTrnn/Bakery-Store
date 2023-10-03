import classNames from "classnames/bind";
import styles from "./RegisterPage.module.scss";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useThunk } from "~/hooks";
import { Button } from "~/components";
import { register } from "~/store";

const cx = classNames.bind(styles);

function RegisterPage() {
  const navigate = useNavigate();
  const [doRegister, isLoading, error, data] = useThunk(register);

  const [showMessengerError, setShowMessengerError] = useState(false);

  useEffect(() => {
    if (isLoading) {
    } else if (error) {
      console.log(error);
      setShowMessengerError(true);
    } else if (data) {
      navigate("/login");
    }
  }, [navigate, isLoading, error, data]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Password is required"),
      name: Yup.string()
        .required("Name is required")
        .min(6, "Must be at least 6 characters"),
      password_confirmation: Yup.string()
        .required("Re-entered password is required")
        .oneOf(
          [Yup.ref("password"), null],
          "Re-entered password does not match"
        ),
    }),
    onSubmit: (values) => {
      // Xử lý logic submit form
      // ...
      doRegister(values);
    },
  });

  return (
    <div className={cx("wrapper")}>
      <Helmet>
        <title>Đăng kí – BAKES SAIGON</title>
      </Helmet>
      <div className={cx("register")}>
        <h2 className={cx("register-heading")}>Sign up</h2>
        {showMessengerError && (
          <div className={cx("messenger-error-login")}>
            {error.errors.email}
          </div>
        )}
        <form className={cx("register-form")} onSubmit={formik.handleSubmit}>
          <div className={cx("form-input")}>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.name && formik.errors.name && (
            <div className={cx("messenger-error")}>{formik.errors.name}</div>
          )}
          <div className={cx("form-input")}>
            <input
              placeholder="email"
              type="email"
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
              placeholder="password"
              type="password"
              name="password"
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
          <div className={cx("form-input")}>
            <input
              placeholder="passwordConfirmation"
              type="password"
              name="password_confirmation"
              value={formik.values.password_confirmation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.password_confirmation &&
            formik.errors.password_confirmation && (
              <div className={cx("messenger-error")}>
                {formik.errors.password_confirmation}
              </div>
            )}
          <Button primary outline className={cx("btn-register")} type="submit">
            Sign Up
          </Button>
        </form>
        <div className={cx("actions")}>
          <Button to={"/login"}>login</Button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
