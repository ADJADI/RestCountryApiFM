import React from "react";
import classNames from "classnames";
import useDarkMode from "../hooks/useDarkMode";
import PropTypes from "prop-types";

const DarkModeContainer = ({ children }) => {
  const [darkMode] = useDarkMode();

  const containerClasses = classNames({
    "bg-white text-VeryDarkBlueTwo": !darkMode,
    "bg-DarkBlue text-VeryLightGray": darkMode,
  });

  return <div className={containerClasses}>{children}</div>;
};

export default DarkModeContainer;

DarkModeContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
