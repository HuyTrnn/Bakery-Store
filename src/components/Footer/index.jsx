import { useTranslation } from "react-i18next";
import styles from "./Footer.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Footer() {
  const { t } = useTranslation();

  const footerData = [
    {
      id: Math.random(),
      heading: t('contact'),
      content: [
        "Hotline: +84 902 77 42 44",
        "Mon - Fr, 09:00 - 18:00",
        "Email: team@havegooddays-saigon.com",
        "Address: 47 Tran Cao Van, D3, HCM",
      ],
    },
    {
      id: Math.random(),
      heading: t('about-us'),
      content: [
        t('welcome')
      ],
    },
    {
      id: Math.random(),
      heading: t('about-us'),
      content: [
        t('seo')
      ],
    },
  ];

  const renderedFooterData = footerData.map((content) => {
    const renderedParagraph = content.content.map((paragraph, index) => {
      return (
        <p key={index}>
          {paragraph}
          <br />
        </p>
      );
    });
    return (
      <div key={content.id} className={cx("col", "l-4", "m-4", "c-12")}>
        <div>
          <h3 className={cx("footer-heading")}>{content.heading}</h3>
          <div className={cx("separate", "w-full")}></div>
          <div className={cx("footer-content")}>{renderedParagraph}</div>
        </div>
      </div>
    );
  });
  return (
    <div className={cx("footer")}>
      <div className={cx("grid", "wide")}>
        <div className={cx("row")}>{renderedFooterData}</div>
      </div>
    </div>
  );
}

export default Footer;
