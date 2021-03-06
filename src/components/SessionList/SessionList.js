import React from "react";
import PropTypes from "prop-types";

import TableHeader from "../TableHeader/TableHeader.js";

import getItemType from "../../utils/getItemType.js";

import styles from "./SessionList.module.css";
import SessionItem from "./SessionItem/SessionItem.js";

function SessionList(props) {
  const thisStageData =
    props.thisRunData["stages"][props.thisStage]["sessions"];

  const itemName = getItemType(props.thisStage);

  const columns = [
    { copy: "№", className: `${styles.colNumber} ${styles.colFixed}` },
    { copy: "Activity", className: styles.colActivity },
    {
      copy: "Start Time",
      className: `${styles.colStartTime} ${styles.colFixed}`,
    },
    { copy: "Duration", className: `${styles.colDuration} ${styles.colFixed}` },
    { copy: itemName, className: `${styles.colItemsGood} ${styles.colFixed}` },
    {
      copy: "Defective",
      className: `${styles.colItemsBad} ${styles.colFixed}`,
    },
    { copy: "Users", className: `${styles.colTech} ${styles.colFixed}` },
    { copy: "Action", className: `${styles.colAction} ${styles.colFixed}` },
    { copy: "Info", className: `${styles.colInfo} ${styles.colFixed}` },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <TableHeader items={columns} />
      </header>
      <ul className={styles.sessionList}>
        {thisStageData
          .slice(0)
          .reverse()
          .map((session, index) => (
            <li
              className={styles.sessionListItem}
              key={"sli-" + session.sessionId}
            >
              <SessionItem
                session={session}
                thisStageData={thisStageData}
                itemCount={thisStageData.length - index}
                thisStage={props.thisStage}
                endSession={props.endSession}
                updateSession={props.updateSession}
                activeUser={props.activeUser}
                columns={columns}
              />
            </li>
          ))}

        <SessionItem overview thisStageData={thisStageData} columns={columns} />
      </ul>
    </div>
  );
}

SessionList.propTypes = {
  thisRunData: PropTypes.object.isRequired,
  thisStage: PropTypes.number.isRequired,
  endSession: PropTypes.func.isRequired,
  updateSession: PropTypes.func.isRequired,
  activeUser: PropTypes.string.isRequired,
};

export default SessionList;
