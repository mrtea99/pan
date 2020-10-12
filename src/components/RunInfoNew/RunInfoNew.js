import React from "react";

import Modal from "../Modal/Modal.js";
import RunInfoForm from "../RunInfoForm/RunInfoForm.js";

function RunInfoNew(props) {
  const createRun = function(productTemplateData) {
    let newData = [...props.runData];

    //Build new run object here
    const newRun = {
      uid: Date.now(),
      activeStage: 0,
      completion: null,
      runInfo: {
        runId: new Date().getUTCMilliseconds(),
      },
      productInfo: productTemplateData,
      stages: [
        {
          sessions: [],
          active: true,
        },
        {
          sessions: [],
          active: false,
        },
        {
          sessions: [],
          active: false,
        },
        {
          sessions: [],
          active: false,
        },
        {
          sessions: [],
          active: false,
        },
        {
          sessions: [],
          active: false,
        },
      ],
    };
    newData.push(newRun);
    props.setRunData(newData);
    props.setActive(false);
  }

  const handleCancel = function() {
    props.setActive(false);
  }

  return (
    <>
      {props.active ? (
        <Modal>
          <RunInfoForm handleSave={createRun} handleCancel={handleCancel} />
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}

export default RunInfoNew;
