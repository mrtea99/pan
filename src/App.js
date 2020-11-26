import React from "react";
import "./App.css";

import styles from "./App.module.css";

import SiteSidebar from "./components/SiteSidebar/SiteSidebar.js";
import RunList from "./components/RunList/RunList.js";
import RunEditor from "./components/RunEditor/RunEditor.js";
import RunInfoNew from "./components/RunInfoNew/RunInfoNew.js";
import RunInfoChange from "./components/RunInfoChange/RunInfoChange.js";
import Button from "./components/Button/Button.js";
import TabBox from "./components/TabBox/TabBox";
import SiteHeader from "./components/SiteHeader/SiteHeader";
import SiteSettings from "./components/SiteSidebar/SiteSettings/SiteSettings.js";

import TimeFormatContext from "./contexts/TimeFormatContext.js";
import DateFormatContext from "./contexts/DateFormatContext.js";

function App() {
  const savedRunData = () =>
    JSON.parse(window.localStorage.getItem("runData")) || [];
  const savedCurrentRunUid = () =>
    parseInt(window.localStorage.getItem("currentRunUid"), 10) || null;
  const savedActiveStage = () =>
    parseInt(window.localStorage.getItem("activeStage"), 10) || 0;
  const savedActiveUser = () =>
    parseInt(window.localStorage.getItem("activeUser"), 10) || 1;

  const [runData, setRunData] = React.useState(savedRunData);
  const [currentRunUid, setCurrentRunUid] = React.useState(savedCurrentRunUid);
  const [activeStage, setActiveStage] = React.useState(savedActiveStage);
  const [activeUser, setActiveUser] = React.useState(savedActiveUser);

  React.useEffect(() => {
    window.localStorage.setItem("runData", JSON.stringify(runData));
  }, [runData]);

  React.useEffect(() => {
    window.localStorage.setItem("currentRunUid", currentRunUid);
  }, [currentRunUid]);

  React.useEffect(() => {
    window.localStorage.setItem("activeStage", activeStage);
  }, [activeStage]);

  React.useEffect(() => {
    window.localStorage.setItem("activeUser", activeUser);
  }, [activeUser]);

  const [modalNewActive, setModalNewActive] = React.useState(false);
  const [modalChangeActive, setModalChangeActive] = React.useState(false);
  const [sidebarActive, setSidebarActive] = React.useState(false);

  const updateRunData = function (uid, dataSection, dataKey, newValue) {
    if (dataSection === "delete") {
      deleteRun(uid);
    } else {
      const updatedRunData = runData.map((run) => {
        if (run.uid === uid) {
          //A new object should be created and returned here, but this is working for the time being
          if (dataSection !== null) {
            run[dataSection][dataKey] = newValue;
          } else {
            run[dataKey] = newValue;
          }
          return run;
        }
        return run;
      });
      setRunData(updatedRunData);
    }
  };

  const deleteRun = function (uid) {
    const updatedRunData = runData.filter((run) => uid !== run.uid);
    setRunData(updatedRunData);
  };

  // Site settings
  const savedTimeFormat = () =>
    window.localStorage.getItem("timeFormat") || "24h";
  const [timeFormat, setTimeFormat] = React.useState(savedTimeFormat);
  React.useEffect(() => {
    window.localStorage.setItem("timeFormat", timeFormat);
  }, [timeFormat]);

  const savedDateFormat = () =>
    window.localStorage.getItem("dateFormat") || "ymd";
  const [dateFormat, setDateFormat] = React.useState(savedDateFormat);
  React.useEffect(() => {
    window.localStorage.setItem("dateFormat", dateFormat);
  }, [dateFormat]);

  return (
    <TimeFormatContext.Provider value={timeFormat}>
      <DateFormatContext.Provider value={dateFormat}>
        <div className={styles.siteContainer}>
          <SiteHeader
            activeUser={activeUser}
            setActiveUser={setActiveUser}
            setSidebarActive={setSidebarActive}
          />
          <div className={styles.sitePage}>
            <SiteSidebar
              sidebarActive={sidebarActive}
              setSidebarActive={setSidebarActive}
            >
              <SiteSettings
                timeFormat={timeFormat}
                setTimeFormat={setTimeFormat}
                dateFormat={dateFormat}
                setDateFormat={setDateFormat}
              />
            </SiteSidebar>
            <main className={styles.siteContent}>
              <section>
                <menu className={styles.listControls}>
                  <section className={styles.filterControls}></section>
                  <section className={styles.otherControls}>
                    <Button onClick={() => setModalNewActive(true)} icon="plus">
                      New Run
                    </Button>
                    <RunInfoNew
                      active={modalNewActive}
                      setActive={setModalNewActive}
                      runData={runData}
                      setRunData={setRunData}
                    />
                  </section>
                </menu>
                <TabBox
                  boxes={[
                    "All",
                    "Prep",
                    "Craft",
                    "Package",
                    "Label",
                    "Stock",
                  ].map((stage, index) => ({
                    label: stage,
                    content: (
                      <RunList
                        key={stage}
                        runData={runData}
                        setCurrentRunUid={setCurrentRunUid}
                        setActiveStage={setActiveStage}
                        activeUser={activeUser}
                        stageNum={index === 0 ? "all" : index - 1}
                      />
                    ),
                  }))}
                />
              </section>
              <section className={styles.editorSection}>
                <RunEditor
                  runData={runData}
                  currentRunUid={currentRunUid}
                  setCurrentRunUid={setCurrentRunUid}
                  activeStage={activeStage}
                  setActiveStage={setActiveStage}
                  updateRunData={updateRunData}
                  modalActive={modalChangeActive}
                  setModalActive={setModalChangeActive}
                  activeUser={activeUser}
                  setActiveUser={setActiveUser}
                />
                <RunInfoChange
                  active={modalChangeActive}
                  setActive={setModalChangeActive}
                  currentRunUid={currentRunUid}
                  runData={runData}
                  updateRunData={updateRunData}
                />
              </section>
            </main>
          </div>
        </div>
      </DateFormatContext.Provider>
    </TimeFormatContext.Provider>
  );
}

export default App;
