import React from "react";
import PropTypes from "prop-types";

import Button from "../Button/Button.js";
import Icon from "../Icon/Icon.js";

import styles from "./FormItem.module.css";

function FormItem(props) {
  const { ident, label, type, updateHandler, hideLabel, ...fieldProps } = props;

  let labelElem = (
    <label className={styles.label} htmlFor={props.ident}>
      {props.label}
    </label>
  );

  let fieldElem;

  switch (type) {
    case "textarea":
      fieldElem = (
        <textarea
          id={ident}
          name={ident}
          {...fieldProps}
          onChange={(e) => updateHandler(e.target.value)}
          // value={fieldProps.value || ""}
          className={`${styles.field} ${styles.fieldText}`}
        />
      );
      break;
    case "number":
      fieldElem = (
        <div className={styles.fieldWrap}>
          <Button
            className={styles.fieldButton}
            icon={"minus"}
            onClick={(e) =>
              updateHandler(
                fieldProps.value !== parseInt(fieldProps.min)
                  ? fieldProps.value - 1
                  : fieldProps.value
              )
            }
          ></Button>
          <input
            type={type}
            id={ident}
            name={ident}
            {...fieldProps}
            onChange={(e) => updateHandler(parseInt(e.target.value || 0))}
            value={fieldProps.value || 0}
            className={`${styles.field} ${styles.fieldNumber}`}
          />
          <Button
            className={styles.fieldButton}
            icon={"plus"}
            onClick={(e) =>
              updateHandler(
                fieldProps.value !== parseInt(fieldProps.max)
                  ? fieldProps.value + 1
                  : fieldProps.value
              )
            }
          ></Button>
        </div>
      );
      break;
    case "select":
      fieldElem = (
        <div className={styles.fieldWrap}>
          <select
            id={ident}
            name={ident}
            {...fieldProps}
            onChange={(e) => updateHandler(e.target.value)}
            className={`${styles.field} ${styles.fieldSelect}`}
          >
            {props.children}
          </select>
          <span className={styles.fieldSelectBtn}>
            <Icon name="start" className={styles.fieldSelectArrow} />
          </span>
        </div>
      );
      break;
    case "radioGroup":
    case "toggleButton":
      labelElem = <p className={styles.label}>{props.label}</p>;
      fieldElem = (
        <div
          className={
            type === "toggleButton" ? styles.toggleButton : styles.radioGroup
          }
        >
          {props.itemValues.map((itemValue, index) => {
            return (
              <div key={ident + index} className={styles.radioItem}>
                <input
                  type="radio"
                  name={ident}
                  id={ident + index}
                  value={itemValue}
                  checked={props.value === itemValue}
                  onChange={(e) => updateHandler(e.target.value)}
                  className={styles.radioInput}
                />
                <label htmlFor={ident + index} className={styles.radioLabel}>
                  <span className={styles.radioLabelText}>
                    {props.itemLabels[index]}
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      );
      break;
    case "checkbox":
      labelElem = null;
      fieldElem = (
        <div className={styles.fieldWrap}>
          <input
            type="checkbox"
            name={ident}
            id={ident}
            onChange={(e) => updateHandler(e.target.checked)}
            {...fieldProps}
            className={`${styles.checkboxInput} ${fieldProps.className}`}
          />
          {!props.hideLabel ? (
            <label htmlFor={ident} className={styles.radioLabel}>
              <span className={styles.radioLabelText}>{props.label}</span>
            </label>
          ) : null}
        </div>
      );
      break;
    case "date":
      fieldElem = (
        <div className={styles.fieldWrap}>
          <input
            type="date"
            name={ident}
            id={ident}
            onChange={(e) => updateHandler(e.target.valueAsNumber)}
            className={`${styles.field} ${styles.fieldDate}`}
            {...fieldProps}
            value={new Date(fieldProps.value).toISOString().substr(0, 10)}
          />
        </div>
      );
      break;
    default:
      fieldElem = null;
      break;
  }

  return (
    <div className={`${fieldProps.className} ${styles.itemWrap}`}>
      {!props.hideLabel ? labelElem : null}
      {fieldElem}
    </div>
  );
}

FormItem.propTypes = {
  ident: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  updateHandler: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  hideLabel: PropTypes.bool,
};

export default FormItem;
