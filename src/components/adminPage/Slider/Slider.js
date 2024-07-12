import "~/components/";
import { useState, useEffect } from "react";
import HeaderContent from "../HeaderAdmin/headerContent";
import "./Slider.scss";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Switch } from "antd";

function SliderChange() {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const [hiring, setHiring] = useState([]);
  const [job, setJob] = useState()
  const { status, isAuthenticated, user, accessToken } = useSelector(
    (state) => state.auth
  );
  const hiringBanner = {
    url: "https://static.vecteezy.com/system/resources/thumbnails/022/025/818/small_2x/we-are-hiring-banner-png.png",
  };
  const fecthJob = () => {
    fetch("https://backpack-nu.vercel.app/api/active_careers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        token_type: "bearer",
        "Accept-Language": lang || "vi",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setHiring(data);
      });
  };

  const activeCareers = () => {
    fetch("https://backpack-nu.vercel.app/api/active_careers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        token_type: "bearer",
        "Accept-Language": lang || "vi",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setHiring(data);
      });
  }

  useEffect(() => {
    fecthJob();
  }, [lang]);

  const hideJob = (checked) => {
    if(checked) {

    } else {
      fetch("https://backpack-nu.vercel.app/api/auth/products", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token_type: "bearer",
          Authorization: `Bearer ${accessToken}`,
        },
        body: {
          "career_id": job
        },
      })
    }
  };
  return (
    <div className="admin-content">
      <HeaderContent props={"Việc làm"} />
      <div className="admin-content__form">
        <h3> Các việc làm đang hoạt động</h3>
        <div className="rounded p-5 bg-white min-h-[500px]">
          {hiring && hiring.length >0 && hiring.map((job, i) => (
            <div
            key={i}
              className="slider-img__container flex flex-col justify-center"
              style={{ marginLeft: "20px" }}
            >
              <div className={"cart--content w-[200px] border rounded bg-[#f9f6f2] p-4 flex flex-col justify-center items-center cursor-pointer"}>
              <img className="w-[120px] h-[120px]" src={`${hiringBanner.url}`} />
                <div className={"cart--heading"}>
                  <strong className="text-center">{job.title}</strong>
                </div>
                <div className={"cart--description flex flex-col"}>
                  <strong className={" text-center"}>{job.description}</strong>
                  <span className={"text-sm text-center"}>{job.requirements}</span>
                  {/* <span>{job.location}</span> */}
                  <div className={"text-center flex justify-center gap-2"}>
                    {t("salary")}: {job.salary} <Switch defaultChecked onChange={(checked) =>hideJob(checked)} />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* <div
            onClick={(e) => setStatus(false)}
            className="slider-img__container"
          >
            <span>Add a slide</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default SliderChange;
