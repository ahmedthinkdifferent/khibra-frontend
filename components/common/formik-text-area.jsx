import React from "react";
import { Formik } from "formik";
import PropTypes from "prop-types";
import AppUtil from "../../shared/app-util";

const FormikTextArea = (props) => {
  let inputProps = Object.assign({}, props);
  inputProps = AppUtil.removeObjectProperties(inputProps, [
    "formik",
    "onChange",
  ]);
  let currentValue = "";
  if (props.formik.values && props.formik.values[props.name]) {
    currentValue = props.formik.values[props.name];
  }

  function onChange(e) {
    props.formik.setFieldValue(
      props.name,
      e.target.value,
      props.formik.validateOnChange
    );
    if (props.onChange) {
      props.onChange(e);
    }
  }

  return (
    <div className="form-group">
      {props.label && <label htmlFor={props.name}>{props.label || ""}</label>}
      <textarea
        id={props.name}
        {...inputProps}
        value={currentValue}
        onChange={onChange}
      />
      {props.formik.errors[props.name] && (
        <div className="alert alert-danger">
          {props.formik.errors[props.name]}
        </div>
      )}
    </div>
  );
};

FormikTextArea.propTypes = {
  name: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
};

export default FormikTextArea;
