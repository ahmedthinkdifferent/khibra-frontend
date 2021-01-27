import React, { useState } from "react";
import { Formik } from "formik";
import PropTypes from 'prop-types';
import AppUtil from "../../shared/app-util";

const FormikSelect = (props) => {
    let selectProps  = Object.assign({}, props);
    selectProps = AppUtil.removeObjectProperties(selectProps ,
         ['formik','hiddenValue','shownValue','values','onChange']);
     
     const values = [...props.values];    
     values.unshift({[props.hiddenValue]:"",[props.shownValue]:"Select"}); 
     let currentValue= props.formik.values[props.name] || "";

    function onChange(e) {
        props.formik.setFieldValue(props.name, e.target.value, props.formik.validateOnChange);
        if (props.onChange) {
            props.onChange(e);
        } 
    }

    return (
        <div className="form-group">
            <label htmlFor={props.name}>{props.label}</label>
            <select name={props.name} value={currentValue} onChange={onChange} {...selectProps}>
                {values.map((val) => {
                    return <option key={val[props.hiddenValue]}
                        value={val[props.hiddenValue]}>{val[props.shownValue]}</option>
                })}
            </select>
            {props.formik.errors[props.name] &&
                <div className="alert alert-danger">{props.formik.errors[props.name]}</div>}
        </div>
    );
};

FormikSelect.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    formik: PropTypes.object.isRequired,
    hiddenValue: PropTypes.string.isRequired,
    shownValue: PropTypes.string.isRequired,
    values: PropTypes.array.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func
};

export default FormikSelect;
