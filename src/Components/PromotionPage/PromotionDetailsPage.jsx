import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PromotionDetailsPage = () => {
  const { title } = useParams();
  const [promotion, setPromotion] = useState(null);

  const fetchPromotions = async (promotionTitle) => {
    try {
      const response = await fetch(
        `/api/promotions?title=${encodeURIComponent(promotionTitle)}`
      );
      if (response.ok) {
        const data = await response.json();
        const selectedPromotion = data.promotions.find(
          (promotion) => promotion.title === promotionTitle
        );
        setPromotion(selectedPromotion);
      } else {
        console.error("Failed to fetch promotion details");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPromotions(title);
  }, [title]);

  if (!promotion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="promotion-details">
      <h2 className="promotion-title">{promotion.title}</h2>
      <img
        src={promotion.image}
        alt={promotion.title}
        className="promotion-image"
      />
      <p>{promotion.detail}</p>
    </div>
  );
};

export default PromotionDetailsPage;
