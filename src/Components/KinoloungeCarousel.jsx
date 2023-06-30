// import { Carousel } from "react-responsive-carousel";
import { Carousel } from "antd";
// import { ReactDOM } from "react";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export default function KinoCarousel() {
  return (
    <>
      {/* <Carousel>
        <div>
          <img src="https://picsum.photos/id/237/200/300" alt="Pic1" />
          <p className="pic1">
            "The Queen's Corgi" is about the adventure of Rax, the British
            monarch's most beloved dog, who loses track of his mistress and
            stumbles across a clan
            <button className="playbutton" /> <span>Trailer</span>
          </p>
        </div>
        <div>
          <img src="https://picsum.photos/seed/picsum/200/300" alt="Pic2" />
          <p className="pic2">pic2</p>
        </div>
      </Carousel> */}
      <Carousel autoplay>
        <div>
          {/* <h3 style={contentStyle}>1</h3> */}
          <img
            className="carouselImg"
            src="https://picsum.photos/id/237/200/300"
            alt="Pic1"
          />
          <p className="pic1">
            "The Queen's Corgi" is about the adventure of Rax, the British
            monarch's most beloved dog, who loses track of his mistress and
            stumbles across a clan
            <button className="playbutton" /> <span>Trailer</span>
          </p>
        </div>
        <div>
          <img
            className="carouselImg"
            src="https://picsum.photos/seed/picsum/200/300"
            alt="Pic2"
          />
          <p className="pic2">pic2</p>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </>
  );
}
