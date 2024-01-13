import React from "react";
import EmailHook from "../../components/EmailHook";
import { useCollection } from "../../hooks/useCollection";
import FilterList from "../../components/FilterList";

// styles and images

import "./Home.css";

import meat1 from "../../images/meat1.png";
import hero from "../../images/heroimg.png";
import hero2 from "../../images/hero2.png";
import gradient from "../../images/gradient.png";

export default function Home() {
  const { documents, error } = useCollection("items");
  return (
    <div className="homePage">
      <div className="hero">
        <div className="image">
          <img className="gradient" src={gradient} />
          <img src={hero} alt="picture of raw steak" />
          <div className="heroCard">
            <h1>
              Discover our Premium Frozen meats with Quick and Reliable
              delivery.
            </h1>
            <button>Shop Now</button>
          </div>
        </div>
      </div>
      <div className="featuredItems">
        <h3>Featured Items:</h3>
        <div className="featureList">
      {documents && <FilterList items={documents} />}
        </div>
      </div>

      <div className="apBackground">
        <div className="aboutProduct">
          <div className="productImage">
            <img src={meat1} alt="picture of meat" />
          </div>
          <div className="productInfo">
            <h3>About Our Meat</h3>
            <p>
              At Ryan's Meats, we take pride in offering our customers the
              highest quality meat products. We are dedicated to sourcing the
              best cuts of meat from trusted suppliers to ensure exceptional
              quality and flavor. Our beef steaks are carefully selected and
              USDA Choice, which is equivalent to Canadian AAA. All of our
              steaks are aged for 21-28 days, ensuring tenderness and maximizing
              the flavors. Our steaks are corn-fed to produce a distinctive
              taste that sets us apart from the competition. Our range of cuts,
              including ribeye, sirloin, and filet mignon, cater to every
              preference.
            </p>
          </div>
        </div>
      </div>
      <div className="ratings">
        <div className="ratingsCard">
          <h2>Top Quality Meat</h2>
          <p>
            We started buying these products many years ago and realized that
            the quality of meat is better than we can get in restaurants. We’ve
            ordered all of the meat on the list, but our family favorite - from
            8-80 years are the 4 oz tenderloins - they melt in your mouth.”
          </p>
        </div>
        <div className="ratingsCard second">
        <h2>Exceptional Service</h2>
          <p>
            I am thoroughly impressed with Ryan’s exceptional service and great
            selection of quality frozen meat products. Ryan is knowledgeable and
            friendly, and he went above and beyond to help us find exactly what
            we were looking for. I particularly appreciate how easy it is to
            store the frozen meat products in the freezer and thaw them out when
            I'm ready to cook.
          </p>
        </div>
        <div className="ratingsCard last">
        <h2>Very Flexible</h2>
          <p>
            I was impressed with Ryan's timely delivery service and flexibility
            in adjusting my order. Ryan delivered my order on time and the
            products were well-packaged to maintain their quality and freshness.
            Ryan really cares about his customers' satisfaction and makes every
            effort to provide the best possible service.
          </p>
        </div>
      </div>

      <div className="contactBackground">
        <div className="contactMeCont">
          <div className="contactInfo">
            <h2>Got A Question About Our Product?</h2>
            <p>
              Fill out the form and we will send you an email answering your
              question
            </p>
          </div>
          <div className="form">
            <EmailHook />
          </div>
        </div>
      </div>
    </div>
  );
}
