import React from "react";

const Square = props => {
  return (
    <button className="square-button" onClick={props.clickNotification}>
      {props.value}
    </button>
  );
};

export default Square;
