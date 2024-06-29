import classNames from "classnames/bind";
import styles from "./PasswordResetPage.module.scss";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { resetPassword } from "~/store";
import { useThunk } from "~/hooks";
import { Button } from "~/components";

const cx = classNames.bind(styles);
function PasswordResetPage() {
  const [doResetPassword, isLoading, error, data] = useThunk(resetPassword);

  const navigate = useNavigate();

  const [showMessengerError, setShowMessengerError] = useState(false);
  const [succeeded, setSucceeded] = useState(null);

  useEffect(() => {
    if (data) {
      setSucceeded(data.data);
    } else if (error) {
      console.log(error);
      setShowMessengerError(true);
    } else if (isLoading) {
    }
  }, [data, navigate, setShowMessengerError, error, isLoading]);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Vui lòng nhập email")
        .email("Vui lòng nhập đúng định dạng email"),
    }),
    onSubmit: (values) => {
      doResetPassword(values.email);
    },
  });
  return (
    <div className={cx("wrapper")}>
      <Helmet>
        <title>Account – Have good days</title>
      </Helmet>
      <div className={cx("forgot-password")}>
        <h2 className={cx("forgot-password-heading")}>RESET YOUR PASSWORD</h2>
        <p className={cx("forgot-password-sub-heading")}>
          We will send you an email to reset your password.
        </p>
        {showMessengerError && (
          <div className={cx("messenger-error")}>Email is not registered</div>
        )}
        {succeeded && (
          <div className={cx("messenger-succeeded")}>{succeeded}</div>
        )}
        <form
          className={cx("forgot-password-form")}
          onSubmit={formik.handleSubmit}
        >
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

          <Button
            primary
            outline
            className={cx("btn-forgot-password")}
            type="submit"
          >
            SUBMIT
          </Button>
          <Button className={cx("btn-forgot-password")} to={"/login"}>
            CANCEL
          </Button>
        </form>
      </div>
    </div>
  );
}

export default PasswordResetPage;
