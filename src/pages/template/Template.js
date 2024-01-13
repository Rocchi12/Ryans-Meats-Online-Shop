import React, { useState } from "react";
import { useDocument } from "../../hooks/useDocument";
import { useParams, useHistory } from "react-router-dom";
import arrow from "../../images/arrow.png";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCheckoutContext } from "../../hooks/useCheckoutContext";
import { Link } from "react-router-dom";

// styles

import "./Template.css";


export default function Template() {
  const history = useHistory();
  const { deleteDocument } = useFirestore("items");
  const { user } = useAuthContext();
  const { id } = useParams();
  const { error, document } = useDocument("items", id);
  const [imageNum, setImageNum] = useState(0);
  const { items, addItem, addItemDup } = useCheckoutContext();
  const [quantity, setQuantity] = useState(1);
  const [quanError, setQuanError] = useState(null);

  const imgLeft = () => {

    if (!document.images[imageNum - 1]) {
      setImageNum(document.images.length - 1);
    } else {
      setImageNum(imageNum - 1);
    }
  };
  const imgRight = () => {
    if (!document.images[imageNum + 1]) {
      setImageNum(0);
    } else {
      setImageNum(imageNum + 1);
    }
  };

  const handleDelete = (id) => {
    deleteDocument(id);
    history.push("/shop");
  };

  const handleCheckout = () => {
    if (quantity > 0) {
      addItem({
        name: document.name,
        price: document.price,
        quantity: quantity,
        pSize: document.pSize,
        oz: document.oz,
        image: document.images[0],
        id: Math.floor(Math.random() * 100000),
      });
      history.push("/shop");
    } else {
      setQuanError("Quantity must be greater than 0");
    }
  };
  return (
    <div className="template">
      <Link to="/shop" className="btn" id="gobackbtn">
        Go Back
      </Link>

      {document && (
        <>
          <h2>{document.name}</h2>
          <p id="price">${document.price}</p>

          <div className="imageCont">
            <img
              src={document.images[imageNum]}
              alt="image of item"
              className="image"
            />
            {document.images[imageNum - 1] != null && (
              <img
                src={arrow}
                alt={"arrow to the left"}
                onClick={imgLeft}
                className="buttonLeft"
              />
            )}
            {document.images[imageNum + 1] != null && (
              <img
                src={arrow}
                alt="arrow to the right"
                onClick={imgRight}
                className="buttonRight"
              />
            )}
          </div>

          <p className="description">{document.description}</p>

          <ul className="itemDetails">
            <h3>Item Details</h3>

            <li>Ounces: {document.oz}</li>
            <li>Pack Size: {document.pSize}</li>
          </ul>
        </>
      )}
      <div className="buttonCont">
        <form className="quantitySpef">
          <label>Quantity: </label>
          <input
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
          />
        </form>
        {items && (
          <button className="btn" onClick={handleCheckout}>
            {" "}
            Add To Cart{" "}
          </button>
        )}
      </div>
      <br />
      <br />
      {quanError && <p className="error">{quanError}</p>}

      <br />
      <br />

      {user && (
        <button className="btn" onClick={() => handleDelete(id)}>
          Delete Document
        </button>
      )}
    </div>
  );
}
