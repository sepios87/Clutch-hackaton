import React from 'react';
import PropTypes from "prop-types";

import './Input.scss';

export const Input = ({ type, id, placeholder, name, value, onChange, disabled, secondary }) => {

    return <input
        type={type}
        id={id}
        className={`input ${secondary ? "input--secondary" : ""}` }
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={true}
    />

}

Input.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    secondary: PropTypes.bool
}
