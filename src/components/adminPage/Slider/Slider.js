import "~/components/";
import { useState, useEffect } from "react";
import HeaderContent from "../HeaderAdmin/headerContent";
import "./Slider.scss";
import Modal from "../Modal/Modal";

function SliderChange() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(true);
  const [name, setName] = useState();

  function handleModal(data) {
    setStatus(data);
  }

  // const handleNext = (images) => {
  //   setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  // };

  // const handlePrev = (images) => {
  //   setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  // };
  useEffect(() => {
    const fetchSlides = () => {
      fetch("http://localhost:81/api/slide")
        .then((res) => res.json())
        .then((data) => {
          setSlides(data.slide);
        })
        .then(
          slides.map((slide, i) => {
            setImages([...slide.image]);
          })
        );
    };
    fetchSlides();
  }, []);

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
    formData.append("image", images);
    const myJson = formDataToJson(formData);
    console.log(myJson);
    fetch(`http://localhost:81/api/slide`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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
  };

  return (
    <div className="admin-content">
      <HeaderContent props={"Slider"} />
      <div className="admin-content__form">
        <h3> Chỉnh sửa slide</h3>
        <div className="addproduct-form slider-form">
          {slides.map((slide, i) => (
            <div
              className="slider-img__container"
              style={{ marginLeft: "20px" }}
            >
              <img src={`data:image/png;base64,${slide.image}`} />
            </div>
          ))}
          <div
            onClick={(e) => setStatus(false)}
            className="slider-img__container"
          >
            <span>Add a slide</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SliderChange;
