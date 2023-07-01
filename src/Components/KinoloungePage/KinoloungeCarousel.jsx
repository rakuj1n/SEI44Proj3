import { Carousel } from "antd";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  //   background: "#364d79",
  //   backgroundImage: `url(https://d2gynsnnx1ixn5.cloudfront.net/jokp2/images/1600x600/film/162540/640c4b32c9ba526003dc9eec2d947b93.jpg)`,
  //   backgroundSize: "cover",
};

export default function KinoCarousel() {
  return (
    <>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
          <img
            className="carouselImg"
            src="https://d2gynsnnx1ixn5.cloudfront.net/jokp2/images/1600x600/film/162540/640c4b32c9ba526003dc9eec2d947b93.jpg"
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
            src="https://d2gynsnnx1ixn5.cloudfront.net/jokp2/images/1600x600/film/116120/23d986edab380e3c7b86bd99aa6534d8.png"
            alt="Pic2"
          />
          <p className="pic2">pic2</p>
        </div>
        <div>
          <img
            className="carouselImg"
            src="https://d2gynsnnx1ixn5.cloudfront.net/jokp2/images/1600x600/film/61503/2705869b2d72fda77d2db13146b4dcc8.jpg"
            alt="pic3"
          />
          <h3 style={contentStyle}>woof woof</h3>
        </div>
        <div>
          <img
            className="carouselImg"
            src="https://d2gynsnnx1ixn5.cloudfront.net/jokp2/images/1600x600/film/137435/27b56bce929e9fd024b2aaeed513d24e.png"
            alt="pic4"
          />
          <h3 style={contentStyle}>4</h3>
        </div>
        {/* <div>
          <img
            className="carouselImg"
            src="https://d2gynsnnx1ixn5.cloudfront.net/jokp2/images/1600x600/film/137435/27b56bce929e9fd024b2aaeed513d24e.png"
            alt="pic5"
          />
          <h3 style={contentStyle}>5</h3>
        </div> */}
      </Carousel>
    </>
  );
}
