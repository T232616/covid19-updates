import React from "react";
import "./Card.css";
const Card = (props) => {
  return (
    <>
          <div className="caseCard col-sm-12 col-lg-3 mx-auto my-3">
            <h4>{props.head}</h4>
            <h3> {props.text}</h3>
          </div>
    </>
  );
};
export default Card;
