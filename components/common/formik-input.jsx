import React from "react";
import { Formik } from "formik";
import PropTypes from 'prop-types';
import AppUtil from "../../shared/app-util";

const FormikInput = (props) => {
    let inputProps = Object.assign({}, props);
    inputProps = AppUtil.removeObjectProperties(inputProps, ['formik','onChange','showLabel']);
    const currentValue = props.formik.values[props.name] || "";
    const validateOnChange = props.formik.validateOnChange;


    function onChange(e){
        props.formik.setFieldValue(props.name, e.target.value, true);
        if(props.onChange){
            props.onChange(e); 
        }
    }

    function onBlur(e){
        props.formik.setTouched({[props.name]:true},true);
    }

    function renderFieldValidation(){
       const error = props.formik.errors[props.name] ; 
       if(error && (props.formik.isSubmitting || props.formik.touched[props.name])){
        return   <div className="alert alert-danger">{error}</div>; 
       }
       return null;
    }

    return (
        <div className="form-group">
           {props.showLabel &&   <label htmlFor={props.name}>{props.label || ""}</label>}
            <input id={props.name} {...inputProps} value={currentValue} 
            onChange={onChange}   onBlur={onBlur}/>
            {renderFieldValidation()}
        </div>
    );
};

FormikInput.propTypes = {
    name: PropTypes.string.isRequired,
    formik: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    onChange:PropTypes.func,
    showLabel:PropTypes.bool
};
FormikInput.defaultProps= {
    showLabel: true
}
export default FormikInput;
