import React from "react";
import * as common from "../../shared/common";
import PropTypes from "prop-types";

export default function index(props) {
  return <div>{common.getFormattedTime(props.gameTime)}</div>;
}

index.propTypes = {
  gameTime: PropTypes.number.isRequired
};
