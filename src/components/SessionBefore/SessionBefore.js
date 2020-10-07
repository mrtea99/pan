import React from "react";

import Button from "../Button/Button.js";

const activityList = [
  ["Manufacturing", "Packaging"],
  [
    "Manufacturing and Pouring",
    "Create Blend",
    "Create Base",
    "Manufacturing",
    "Pouring",
  ],
  ["Unsupervised", "Supervised", "Finishing Touches"],
  ["Packaging"],
  ["Labeling", "Sealing", "Boxing"],
];

function SessionBefore(props) {
  // Activity type (all)
  const [activityData, setActivityData] = React.useState(
    activityList[props.thisStage][0]
  );
  // Room temp (manu and cool)
  const [temperature, setTemperature] = React.useState(null);
  // Room humidity (manu and cool)
  const [humidity, setHumidity] = React.useState(null);

  function handleNewClick(e) {
    e.preventDefault();

    const newSessionUid = Date.now();

    const newSession = {
      sessionUid: newSessionUid,
      startTime: Date.now(),
      activity: activityData,
      user: props.activeUser,
    };

    if (props.thisStage === 1 || props.thisStage === 2) {
      newSession.temperature = temperature;
      newSession.humidity = humidity;
    }

    props.addSession(newSession, newSessionUid);
  }

  function validateForm() {
    if (props.thisStage === 1 || props.thisStage === 2) {
      if (
        typeof temperature === "number" &&
        temperature >= 0 &&
        temperature <= 120 &&
        typeof humidity === "number" &&
        humidity >= 0 &&
        humidity <= 100
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  return (
    <form>
      <div>
        <label htmlFor={"sess-activity-stage-" + props.thisStage}>
          Activity:
        </label>
        <select
          id={"sess-activity-stage-" + props.thisStage}
          onChange={(e) => setActivityData(e.target.value)}
          value={activityData}
        >
          {activityList[props.thisStage].map((activityType, index) => (
            <option
              key={"activity-" + index + "-stage-" + props.thisStage}
              value={activityType}
            >
              {activityType}
            </option>
          ))}
        </select>
      </div>
      {props.thisStage === 1 || props.thisStage === 2 ? (
        <>
          <div>
            <label htmlFor={"sess-temp-stage-" + props.thisStage}>
              Room Temperature:
            </label>
            <input
              id={"sess-temp-stage-" + props.thisStage}
              type="number"
              onChange={(e) => setTemperature(parseInt(e.target.value))}
              min="0"
              max="120"
            />
          </div>
          <div>
            <label htmlFor={"sess-humidity-stage-" + props.thisStage}>
              Room Humidity:
            </label>
            <input
              id={"sess-humidity-stage-" + props.thisStage}
              type="number"
              onChange={(e) => setHumidity(parseInt(e.target.value))}
              min="0"
              max="100"
            />
          </div>
        </>
      ) : (
        <></>
      )}
      <Button onClick={handleNewClick} disabled={!validateForm()}>
        Start New Session
      </Button>
    </form>
  );
}

export default SessionBefore;
