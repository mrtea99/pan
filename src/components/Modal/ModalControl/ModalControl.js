import React from "react";
import PropTypes from "prop-types";

import Button from "../../Button/Button.js";
import ButtonSpacer from "../../Button/ButtonSpacer/ButtonSpacer.js";
import Modal from "../../Modal/Modal.js";
import Pager from "../../Pager/Pager.js";

function ModalControl(props) {
  const [modalActive, setModalActive] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(0);

  const handleSubmit = function (e) {
    e.preventDefault();

    setModalActive(false);

    props.handleSubmit();
  };

  const handleCancel = function (e) {
    e.preventDefault();

    setModalActive(false);
    setPageNumber(0);

    if (props.handleCancel) {
      props.handleCancel();
    }
  };

  const { fillWidth, ...saveBtnAttrs } = props.buttonAttrs || false;

  const submitButton = function () {
    return (
      <Button {...saveBtnAttrs} onClick={(e) => handleSubmit(e)}>
        {props.submitCopy || props.triggerCopy || "Save"}
      </Button>
    );
  };

  const cancelButton = function () {
    return (
      <Button
        onClick={(e) => {
          handleCancel(e);
        }}
        color="cancel"
      >
        Cancel
      </Button>
    );
  };

  /* <ModalControl
        title="Assign Stage"
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        triggerCopy={"Assign Stage"}
        buttonAttrs={{ fillWidth: true, color: "assign", icon: "assign" }}
        pages={[
          <React.Fragment key="key1">Page1</React.Fragment>,
          <React.Fragment key="key2">Page2</React.Fragment>,
          <React.Fragment key="key3">Page3</React.Fragment>,
          <React.Fragment key="key4">Page4 </React.Fragment>,
        ]}
      /> */

  return (
    <>
      <Button {...props.buttonAttrs} onClick={() => setModalActive(true)}>
        {props.triggerCopy}
      </Button>
      {modalActive ? (
        <Modal title={props.title}>
          {props.pages ? (
            <>
              <Pager
                pages={props.pages}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
              >
                Test
              </Pager>
              <br />
              <ButtonSpacer align="right">
                <>{cancelButton()}</>
                {props.handleSubmit && pageNumber === props.pages.length - 1 ? (
                  <>{submitButton()}</>
                ) : null}
              </ButtonSpacer>
            </>
          ) : (
            <>
              {props.children}
              {props.handleSubmit ? (
                <ButtonSpacer align="right">
                  <>{cancelButton()}</>
                  <>{submitButton()}</>
                </ButtonSpacer>
              ) : (
                <>{cancelButton()}</>
              )}
            </>
          )}
        </Modal>
      ) : null}
    </>
  );
}

ModalControl.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func,
  handleCancel: PropTypes.func,
  buttonAttrs: PropTypes.object,
  triggerCopy: PropTypes.string,
  children: PropTypes.node,
  pages: PropTypes.array,
};

export default ModalControl;
