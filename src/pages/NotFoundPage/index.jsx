import styles from "./NotFoundPage.module.scss";
import classNames from "classnames/bind";
import { Helmet } from "react-helmet-async";

const cx = classNames.bind(styles);

function NotFoundPage() {
  return (
    <div className={cx("wrapper")}>
      <Helmet>
        <title>Không tìm thấy trang – BAKES SAIGON</title>
      </Helmet>
      <h1>404 Page Not Found</h1>
      <p>We're sorry, but the page you requested could not be found.</p>
    </div>
  );
}

export default NotFoundPage;
