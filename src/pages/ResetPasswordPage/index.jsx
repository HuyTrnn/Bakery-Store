import classNames from "classnames/bind";
import styles from "./RessetPasswordPage.module.scss";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { changePassword } from "~/store";
import { useThunk } from "~/hooks";
import { Button } from "~/components";

const cx = classNames.bind(styles);

function ResetPasswordPage() {
  const [doChangePassword, isLoading, error, data] = useThunk(changePassword);

  const navigate = useNavigate();
  const { token } = useParams();
  const value = token.split("-");
  const [showMessengerError, setShowMessengerError] = useState(false);
  const [succeeded, setSucceeded] = useState(null);

  useEffect(() => {
    if (data) {
      console.log(data);
      setSucceeded(data.data);
      navigate("/login");
    } else if (error) {
      console.log(error);
      setShowMessengerError(true);
    } else if (isLoading) {
    }
  }, [data, navigate, setShowMessengerError, error, isLoading]);
  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Password is required"),
      password_confirmation: Yup.string()
        .required("Re-entered password is required")
        .oneOf(
          [Yup.ref("password"), null],
          "Re-entered password does not match"
        ),
    }),
    onSubmit: ({ password, password_confirmation }) => {
      doChangePassword({
        resetToken: value[0],
        email: value[1],
        password,
        password_confirmation,
      });
    },
  });
  return (
    <div className={cx("wrapper")}>
      <Helmet>
        <title>Account – Have good days</title>
      </Helmet>
      <div className={cx("forgot-password")}>
        <h2 className={cx("forgot-password-heading")}>
          RESET ACCOUNT PASSWORD
        </h2>
        <p className={cx("forgot-password-sub-heading")}>
          Enter a new password for {value[1]}
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

          <Button
            primary
            outline
            className={cx("btn-forgot-password")}
            type="submit"
          >
            RESET PASSWORD
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
