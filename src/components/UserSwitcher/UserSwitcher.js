import React from "react";
import PropTypes from "prop-types";

import Icon from "../Icon/Icon.js";

import styles from "./UserSwitcher.module.css";

function UserSwitcher(props) {
  return (
    <div className={styles.main}>
      <select
        type="select"
        value={props.activeUser}
        onChange={(e) => props.setActiveUser(e.target.value)}
        className={styles.select}
      >
        <option value="1">Jesus Sandoval</option>
        <option value="2">Amanda Kezios</option>
      </select>
      <div className={styles.iconWrapper}>
        <Icon name="user" className={styles.icon}></Icon>
      </div>
    </div>
  );
}

UserSwitcher.propTypes = {
  activeUser: PropTypes.string.isRequired,
  setActiveUser: PropTypes.func.isRequired,
};

export default UserSwitcher;
