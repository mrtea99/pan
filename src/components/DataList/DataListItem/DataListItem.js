import React from "react";
import PropTypes from "prop-types";

import styles from "./DataListItem.module.css";

function DataListItem(props) {
  const { dataKey, dataValue, newLine, ...itemProps } = props;

  return (
    <li {...itemProps} className={`${styles.item} ${props.className}`}>
      <span className={`${styles.cell} ${styles.key}`}>{dataKey}:</span>
      {newLine ? <br /> : " "}
      <span className={`${styles.cell} ${styles.value}`}>{dataValue}</span>
    </li>
  );
}

DataListItem.propTypes = {
  dataKey: PropTypes.node.isRequired,
  dataValue: PropTypes.node,
};

export default DataListItem;
