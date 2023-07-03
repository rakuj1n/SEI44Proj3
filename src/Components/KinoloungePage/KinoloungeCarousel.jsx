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
          {/* <h3 style={contentStyle}>1</h3> */}
          <img
            className="carouselImg"
            src="https://d2gynsnnx1ixn5.cloudfront.net/jokp2/images/1600x600/film/162540/640c4b32c9ba526003dc9eec2d947b93.jpg"
            alt="Pic1"
          />
          <p className="carousel-content" style={contentStyle}>
            "The Queen's Corgi" is about the adventure of Rax, the British
            monarch's most beloved dog, who loses track of his mistress and
            stumbles across a clan
            {/* <img
              src="https://w7.pngwing.com/pngs/181/900/png-transparent-play-icon-red-area-font-play-button-text-internet-circle-thumbnail.png"
              alt="playButton"
            /> */}
            <button className="playbutton">Rent S$4.99</button>
            <span>Trailer</span>
          </p>
        </div>
        <div>
          <img
            className="carouselImg"
            src="https://d2gynsnnx1ixn5.cloudfront.net/jokp2/images/1600x600/film/116120/23d986edab380e3c7b86bd99aa6534d8.png"
            alt="Pic2"
          />
          <p className="carousel-content" style={contentStyle}>
            A friendship forms between a never-aging 10-year-old vampire and an
            orphan schoolboy, but a moon headed monster throws obstacles in
            their paths.
            <button className="playbutton">Rent S$4.99</button>
          </p>
        </div>
        <div>
          <img
            className="carouselImg"
            src="https://d2gynsnnx1ixn5.cloudfront.net/jokp2/images/1600x600/film/61503/2705869b2d72fda77d2db13146b4dcc8.jpg"
            alt="pic3"
          />
          <p style={contentStyle}>
            SamSam appears to have it all: his own flying saucer and great
            family and friends. But the one thing he has yet to attain are
            actual superpowers.
            <button className="playbutton">Rent S$4.99</button>
          </p>
        </div>
        <div>
          <img
            className="carouselImg"
            src="https://d2gynsnnx1ixn5.cloudfront.net/jokp2/images/1600x600/film/137435/27b56bce929e9fd024b2aaeed513d24e.png"
            alt="pic4"
          />
          <p style={contentStyle}>
            Strange lights over the quiet town of Mossingham herald the arrival
            of a mystery visitor from far across the galaxy… but at nearby Mossy
            Bottom Farm
            <button className="playbutton">Rent S$4.99</button>
          </p>
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
