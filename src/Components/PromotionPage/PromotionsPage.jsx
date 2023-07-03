import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PromotionsPage = () => {
  const [promotions, setPromotions] = useState([]);

  const fetchPromotions = async () => {
    try {
      const response = await fetch("/api/promotions");
      if (response.ok) {
        const data = await response.json();
        setPromotions(data.promotions);
      } else {
        console.error("Failed to fetch promotions");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  return (
    <div>
      <h2>Promotions</h2>
      <div className="promotions-grid">
        {promotions.map((promotion) => (
          <div key={promotion.title} className="promotion-item">
            <Link to={`/promotions/${encodeURIComponent(promotion.title)}`}>
              <div className="promotion-content">
                <img
                  src={promotion.image}
                  alt={promotion.title}
                  className="promotion-image"
                />
                <h2 className="promotion-title">{promotion.title}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionsPage;
