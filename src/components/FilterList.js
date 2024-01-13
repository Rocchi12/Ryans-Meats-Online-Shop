import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";

import "./FilterList.css";

export default function FilterList({ items }) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 2000, min: 1700 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1700, min: 1400 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1400, min: 1030 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 1030, min: 700 },
      items: 2,
    },
    smallest: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="filterList">
      <div className="spacing">
        <Carousel
          className="itemLis"
          responsive={responsive}
          infinite={true}
        >
          {items
            .filter((item) => item.feature == true)
            .map((item) => (
              <Link key={item.id} to={`items/${item.id}`} className="itemBox">
                <img src={item.images[0]} alt="image" />
                <div className="itemTitle">
                  <h2>{item.name}</h2>
                  <p className="price">${item.price}</p>
                </div>
                <div className="itemInfo">
                  <p>Pack Size: {item.pSize}</p>
                  <p>Ounces: {item.oz}</p>
                </div>
              </Link>
            ))}
        </Carousel>
      </div>
    </div>
  );
}
