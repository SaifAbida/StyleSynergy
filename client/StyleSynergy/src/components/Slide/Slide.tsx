import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/3.jpg";
import img4 from "../../assets/4.jpg";
import img5 from "../../assets/5.jpg";
import img6 from "../../assets/6.jpg";
import img7 from "../../assets/7.jpg";
import img8 from "../../assets/8.jpg";
import img9 from "../../assets/9.jpg";
import img10 from "../../assets/10.jpg";
import "./Slide.css";

const Slide = () => {
  return (
    <div
      id="carouselExampleRide"
      className="carousel slide"
      data-bs-ride="true"
    >
      <div className="carousel-inner rounded-2">
        <div className="carousel-item active">
          <img src={img1} className="w-100 rounded-2" alt="fashion-img" />
        </div>
        <div className="carousel-item">
          <img src={img2} className="w-100 rounded-2" alt="fashion-img" />
        </div>
        <div className="carousel-item">
          <img src={img3} className="w-100 rounded-2" alt="fashion-img" />
        </div>
        <div className="carousel-item">
          <img src={img4} className="w-100 rounded-2" alt="fashion-img" />
        </div>
        <div className="carousel-item">
          <img src={img5} className="w-100 rounded-2" alt="fashion-img" />
        </div>
        <div className="carousel-item">
          <img src={img6} className="w-100 rounded-2" alt="fashion-img" />
        </div>
        <div className="carousel-item">
          <img src={img7} className="w-100 rounded-2" alt="fashion-img" />
        </div>
        <div className="carousel-item">
          <img src={img8} className="w-100 rounded-2" alt="fashion-img" />
        </div>
        <div className="carousel-item">
          <img src={img9} className="w-100 rounded-2" alt="fashion-img" />
        </div>
        <div className="carousel-item">
          <img src={img10} className="w-100 rounded-2" alt="fashion-img" />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleRide"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleRide"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
      <span className="brand-phrase">
        <div id="Your-Fashion">Your Fashion</div>
        <div id="Journey">Journey</div>
        <div id="Start-here">Starts Here</div>
      </span>
    </div>
  );
};

export default Slide;
