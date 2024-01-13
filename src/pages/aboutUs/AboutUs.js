import React from "react";
import "./AboutUs.css";

// styles
import flier from "../../images/Flier.png"
import logo from "../../images/logoW.png"

export default function AboutUs() {
  return (
    <div className="aboutUs">
      <div className="title">
        <div>
          <h1>About us</h1>
        </div>
      </div>
      <div className="content">
        <div className="text">
          <div>
            <p>
              Welcome to Ryan's Meats, your trusted source for high-quality meat
              products in the GTA. We are a locally owned and operated business,
              and we take pride in serving our community with exceptional
              customer service.
            </p>
            <p>
              At Ryan's Meats, we understand that convenience is crucial for our
              customers, which is why we offer home delivery of our premium meat
              products. With just a few clicks, you can enjoy our pre portioned,
              pre packaged and individually frozen cuts of meat delivered right
              to your doorstep. Our packaging is designed to keep your order
              fresh and ready to cook, so you can enjoy restaurant-quality meals
              at home.
            </p>
            <p>
              We believe that quality and customer service are the cornerstones
              of our business. That's why we take great care in sourcing quality
              meat from our trusted supplier. Our beef is USDA Choice, aged for
              21-28 days, and corn-fed to produce a rich and distinctive flavor
              that you won't find anywhere else.
            </p>
            <p>
              At Ryan's Meats, we are committed to providing our customers with
              exceptional products and service. We believe that every customer
              deserves personalized attention and care, and we are always ready
              to go the extra mile to ensure your satisfaction.
            </p>
            <p>
              If you have any questions about our products or services, please
              do not hesitate to contact us. We are always happy to help you
              choose the perfect cut of meat or answer any questions you may
              have. Thank you for choosing Ryan's Meats - we look forward to
              serving you soon!
            </p>
          </div>
        </div>
        <img src={flier} alt="a flier" className="big"/>
        <img src={logo} alt="a flier" className="small"/>
      </div>
    </div>
  );
}
