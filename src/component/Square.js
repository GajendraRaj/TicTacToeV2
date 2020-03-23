import React from "react";
import PropTypes from "prop-types";

const Square = props => {
  return (
    <button
      className="square-button"
      onClick={props.clickNotification}
      disabled={props.isDisabled}
    >
      {props.value}
    </button>
  );
};

export default Square;

Square.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  value: PropTypes.string
};
