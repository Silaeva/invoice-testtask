import React from "react";
import PropTypes from "prop-types";
import styles from "./content.module.scss";

const Content = (props) => {
  const {title, children} = props;

  return (
    <div className={styles["content"]}>
      <h1 className={styles["content__title"]}>{title}</h1>
      {children}
    </div>
  );
};

Content.protTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}

export {Content};
