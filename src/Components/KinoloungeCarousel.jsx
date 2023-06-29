import { Carousel } from "react-responsive-carousel";
// import { ReactDOM } from "react";

export default function KinoCarousel() {
  return (
    <>
      <Carousel>
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
      </Carousel>
    </>
  );
}
