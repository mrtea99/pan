import React from "react";
import PropTypes from "prop-types";

import Button from "../../Button/Button.js";
import Modal from "../../Modal/Modal.js";
import SessionEndForm from "./SessionEndForm/SessionEndForm.js";

function SessionEnd(props) {
  const [modalActive, setModalActive] = React.useState(false);

  return (
    <div className={props.className}>
      <Button
        onClick={() => setModalActive(true)}
        fillWidth
        icon="stop"
        featured
      >
        End Session
      </Button>
      {modalActive ? (
        <Modal title={`End ${props.activeSessionData.activity.name} Session`}>
          <SessionEndForm
            setFormActive={setModalActive}
            addSession={props.addSession}
            endSession={props.endSession}
            thisStage={props.thisStage}
            activeSessionData={props.activeSessionData}
            thisRunData={props.thisRunData}
            activeUser={props.activeUser}
          />
        </Modal>
      ) : null}
    </div>
  );
}

SessionEnd.propTypes = {
  className: PropTypes.string,
  activeSessionData: PropTypes.object.isRequired,
  addSession: PropTypes.func.isRequired,
  endSession: PropTypes.func.isRequired,
  thisStage: PropTypes.number.isRequired,
  thisRunData: PropTypes.object.isRequired,
  activeUser: PropTypes.string.isRequired,
};

export default SessionEnd;
