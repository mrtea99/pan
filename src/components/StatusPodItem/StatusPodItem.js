import React from "react";

import InfoPodItem from "../InfoPod/InfoPodItem/InfoPodItem.js";
import Icon from "../Icon/Icon.js";

import styles from "./StatusPodItem.module.css";

import { ReactComponent as Checkmark } from "./checkmark.svg";

function StatusPodItem(props) {
  const getLabel = function () {
    if (props.stageStatus.workActive) {
      return props.stageStatus.workActiveNames;
    } else {
      return (
        props.stageStatus.stageStatusName.charAt(0).toUpperCase() +
        props.stageStatus.stageStatusName.slice(1)
      );
    }
  };

  const combinedCompletion = function () {
    if (
      props.stageStatus.stageStatusName === "ready" ||
      props.stageStatus.stageStatusName === "started" ||
      props.stageStatus.stageStatusName === "working"
    ) {
      if (props.stageNum === 0 || props.stageNum === 4) {
        return props.stageStatus.workTotal;
      } else {
        return props.stageStatus.completionPercentage + "%";
      }
    }

    if (props.stageStatus.stageStatusName === "complete") {
      return <Checkmark className={styles.icon} />;
    }

    return "";
  };

  const findElem = function () {
    switch (props.statusField) {
      case "label":
        return (
          <InfoPodItem
            type={props.type}
            active
            className={`${
              styles["podItem" + props.stageStatus.stageStatusName]
            }`}
          >
            {getLabel()}
          </InfoPodItem>
        );
      case "completion":
        return (
          <InfoPodItem
            type={props.type}
            active
            className={`${
              styles["podItem" + props.stageStatus.stageStatusName]
            }`}
          >
            {combinedCompletion()}
          </InfoPodItem>
        );
      case "completionFraction":
        if (
          (props.stageStatus.stageStatusName === "ready" ||
            props.stageStatus.stageStatusName === "started" ||
            props.stageStatus.stageStatusName === "working") &&
          props.stageNum !== 0 &&
          props.stageNum !== 4
        ) {
          return (
            <InfoPodItem
              type={props.type}
              active
              className={`${
                styles["podItem" + props.stageStatus.stageStatusName]
              }`}
            >
              {props.stageStatus.itemCount +
                "/" +
                props.stageStatus.targetItemCount}
            </InfoPodItem>
          );
        }
        return null;
      case "user":
        if (props.stageStatus.userTotal || props.type === "flag") {
          return (
            <InfoPodItem
              type={props.type}
              active={props.stageStatus.userTotal}
              className={`${
                props.stageStatus.userActive ? styles.podItemworking : ""
              } ${
                props.stageStatus.stageStatusName === "complete"
                  ? styles.podItemcomplete
                  : ""
              }`}
            >
              <Icon
                name="user"
                className={`${styles.icon} ${styles.iconUser}`}
              ></Icon>
            </InfoPodItem>
          );
        }
        return null;
      case "qa":
        if (props.stageStatus.qaActive || props.type === "flag") {
          return (
            <InfoPodItem
              type={props.type}
              active={props.stageStatus.qaActive}
              className={styles.flagQa}
            >
              <Icon name="qa" className={styles.icon}></Icon>
            </InfoPodItem>
          );
        }
        return null;
      case "issue":
        if (props.stageStatus.issueActive || props.type === "flag") {
          return (
            <InfoPodItem
              type={props.type}
              active={props.stageStatus.issueActive}
              className={styles.flagIssue}
            >
              <Icon name="issue" className={styles.icon}></Icon>
            </InfoPodItem>
          );
        }
        return null;
      default:
        return null;
    }
  };

  return <>{findElem()}</>;
}

export default StatusPodItem;