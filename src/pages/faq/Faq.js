import React, { useState } from "react";
import arrow from "../../images/arrowDown.png";
import "./Faq.css";

export default function Faq() {
  const [dropDown, setDropDown] = useState([]);
  const openDropDown = (e, num) => {
    e.preventDefault();
    let cont = 0;
    let a = [];
    for (const i of dropDown) {
      if (num != i) {
        a.push(i);
      } else {
        cont++;
        break;
      }
    }
    if (cont == 0) {
      a.push(num);
    }
    setDropDown(a);
  };
  return (
    <div className="faq">
      <div className="title">
        <div>
          <h1>FAQ </h1>
          <p>
            This is a faq page answering our most frequently asked questions. If
            you have a question that is not on the FAQ page that you want to be
            answered we encourage you to send us an email using the form on the
            home page. If we find a question is frequently asked from the email
            we will add it to the FAQ page
          </p>
        </div>
      </div>

      <div className="qa-background">
        <div className="question" onClick={(e) => openDropDown(e, 1)}>
          <h2>What is Ryan’s Meats</h2>
          <img src={arrow} alt="dropdown arrow" />
        </div>
        {dropDown.includes(1) && (
          <div className="answer">
            <p>
              Ryan’s Meats is a locally owned and operated meat distributor
              providing the GTA with top quality steaks and burgers
            </p>
          </div>
        )}
      </div>
      <div className="qa-background">
        <div className="question" onClick={(e) => openDropDown(e, 2)}>
          <h2>Where is Ryan’s Meats located</h2>
          <img src={arrow} alt="dropdown arrow" />
        </div>
        {dropDown.includes(2) && (
          <div className="answer">
            <p>
              We actually don’t have any retail locations as our business model
              is built around home delivery
            </p>
          </div>
        )}
      </div>
      <div className="qa-background">
        <div className="question" onClick={(e) => openDropDown(e, 3)}>
          <h2>What is the quality of the meats at Ryan's Meats?</h2>
          <img src={arrow} alt="dropdown arrow" />
        </div>
        {dropDown.includes(3) && (
          <div className="answer">
            <p>
              Ryan's Meats sources its products from a trusted and quality
              supplier. All of our products are graded USDA choice, which is
              equivalent to Canadian AAA
            </p>
          </div>
        )}
      </div>
      <div className="qa-background">
        <div className="question" onClick={(e) => openDropDown(e, 4)}>
          <h2>How does the delivery system work at Ryan’s Meats?</h2>
          <img src={arrow} alt="dropdown arrow" />
        </div>
        {dropDown.includes(4) && (
          <div className="answer">
            <p>
              We offer free delivery on orders over $100 and will deliver around
              the GTA. Please contact for more specific inquiries on deliveries
            </p>
          </div>
        )}
      </div>

      <div className="qa-background">
        <div className="question" onClick={(e) => openDropDown(e, 5)}>
          <h2>What if I am outside of the GTA or ordering less than $100?</h2>
          <img src={arrow} alt="dropdown arrow" />
        </div>
        {dropDown.includes(5) && (
          <div className="answer">
            <p>
              That isn’t a problem, just contact us and we will be happy to
              discussion options and work with you to determine a way to deliver
              the product to you
            </p>
          </div>
        )}
      </div>

      <div className="qa-background">
        <div className="question" onClick={(e) => openDropDown(e, 6)}>
          <h2>Does Ryan's Meats have any specials or promotions?</h2>
          <img src={arrow} alt="dropdown arrow" />
        </div>
        {dropDown.includes(6) && (
          <div className="answer">
            <p>
              Yes, Ryan's Meats often runs specials on certain cuts of meat or
              offers discounts on bulk orders. Check our website or subscribe to
              our newsletter for up to date promotions and offers
            </p>
          </div>
        )}
      </div>
      <div className="qa-background">
        <div className="question" onClick={(e) => openDropDown(e, 7)}>
          <h2>How do I place an order?</h2>
          <img src={arrow} alt="dropdown arrow" />
        </div>
        {dropDown.includes(7) && (
          <div className="answer">
            <p>
              After determining what you would like; email, text or call us and
              we will place your order. Please note our stock fluctuates on a
              week to week basis so delivery on certain products will be longer
              than others.{" "}
            </p>
          </div>
        )}
      </div>

      <div className="qa-background">
        <div className="question" onClick={(e) => openDropDown(e, 8)}>
          <h2>Do you accept wholesale orders?</h2>
          <img src={arrow} alt="dropdown arrow" />
        </div>
        {dropDown.includes(8) && (
          <div className="answer">
            <p>
              Yes we do! Feel free to reach out to see what we have to offer and
              hopefully we can work together.
            </p>
          </div>
        )}
      </div>

      <div className="qa-background">
        <div className="question" onClick={(e) => openDropDown(e, 9)}>
          <h2>What if I have an issue with the products ordered?</h2>
          <img src={arrow} alt="dropdown arrow" />
        </div>
        {dropDown.includes(9) && (
          <div className="answer">
            <p>
              We are sorry to hear you have had an issue. Please email, call or
              text us and we will be sure to help find a solution. We pride
              ourselves on customer service so please be assured you will be
              taken care of.
            </p>
          </div>
        )}
      </div>

      <div className="qa-background">
        <div className="question" onClick={(e) => openDropDown(e, 10)}>
          <h2>Are the products fresh or frozen?</h2>
          <img src={arrow} alt="dropdown arrow" />
        </div>
        {dropDown.includes(10) && (
          <div className="answer">
            <p>
              All of the products at Ryan’s Meats are individually packaged and
              frozen. This allows the utmost freshness and quality of products.
            </p>
          </div>
        )}
      </div>
      <div className="qa-background">
        <div className="question" onClick={(e) => openDropDown(e, 11)}>
          <h2>How do I properly thaw out these products</h2>
          <img src={arrow} alt="dropdown arrow" />
        </div>
        {dropDown.includes(11) && (
          <div className="answer">
            <p>
              Burgers purchased at Ryan’s Meats are to be cooked frozen.
              Instructions for properly thawing our steaks can be found in the
              cooking/handling page of the website.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
