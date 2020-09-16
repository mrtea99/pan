import React from 'react';

const activityList = [
  [
    'Manufacturing',
    'Packaging'
  ],
  [
    'Manufacturing and Pouring',
    'Create Blend',
    'Create Base',
    'Manufacturing',
    'Pouring'
  ],
  [
    'Unsupervised',
    'Supervised',
    'Finishing Touches'
  ],
  [
    'Packaging',
  ],
  [
    'Labeling',
    'Sealing',
    'Boxing'
  ],
]

function SessionControl(props) {
  // Before states
    // Activity type (all)
    const [activityData, setActivityData] = React.useState(props.activeSession ? '' : activityList[props.thisStage][0]);
    // Room temp (manu and cool)
    // Room humidity (manu and cool)
  // After Statuses
    // Notes (all)
    const [noteData, setNoteData] = React.useState('');
    // QA check (manu, pack, label)
    // Quantity made (manu, pack, label)
    // Number Defective (manu, pack, label)
    // Batch weight (manu)
    // Average unti weight (pack)

  function handleNewClick(e) {
    e.preventDefault();

    const newSessionUid = Date.now();

    const newSession = {
      sessionUid: newSessionUid,
      startTime: Date.now(),
      activity: activityData
    }

    props.addSession(newSession, newSessionUid)
  }

  function handleEndClick(e) {
    e.preventDefault();

    const extraData = {
      notes: noteData,
    }

    props.endSession(extraData);

    setNoteData('');
    setActivityData(activityList[props.thisStage][0]);
  }

  return (
    <>
      <h3>Session Control</h3>

      {props.activeSession ?
      <>
        <div>
          <h4>Session {props.activeSession} in progress</h4>
          {props.activeSessionData ? 
          <dl>
            <dt>Start Time:</dt>
            <dd>{props.activeSessionData.startTime}</dd>
            <dt>Activity:</dt>
            <dd>{props.activeSessionData.activity}</dd>
          </dl>
          :
          <></>
          }
        </div>
        <form>
          <div>
            <label htmlFor={"sess-notes-step-" + props.thisStage}>Notes:</label>
            <textarea id={"sess-notes-step-" + props.thisStage} onChange={(e) => setNoteData(e.target.value)}></textarea>
          </div>
          <button onClick={handleEndClick}>End Session</button>
        </form>
      </>
      : 
      <>
        <form>
          <div>
            <label htmlFor={"sess-activity-step-" + props.thisStage}>Activity:</label>
            <select id={"sess-activity-step-" + props.thisStage} onChange={(e) => setActivityData(e.target.value)} value={activityData}>
              {activityList[props.thisStage].map((activityType, index) => 
                <option key={'activity-' + index + '-stage-' + props.thisStage} value={activityType}>{activityType}</option>
              )}
            </select>
          </div>
          <div>
            <label htmlFor="sess-temp">Room Temperature:</label>
            <input id="sess-temp" type="text" />
          </div>
          <button onClick={handleNewClick}>Start New Session</button>
        </form>
      </>
      }
      {/* <button disabled={props.activeSession ? 'disabled' : '' } onClick={handleNewClick}>Start New Session</button>
      <button disabled={props.activeSession ? '' : 'disabled' } onClick={handleEndClick}>End Session</button> */}
      
    </>
  )
}


export default SessionControl;