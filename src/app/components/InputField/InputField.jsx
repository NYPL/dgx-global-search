import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({
  id,
  lang,
  type,
  name,
  value,
  checked,
  maxLength,
  placeholder,
  className,
  onKeyPress,
  onChange,
  isRequired,
  style,
  label,
}) => (
  <input
    id={id}
    lang={lang}
    type={type}
    name={name}
    value={value}
    checked={checked}
    maxLength={maxLength}
    placeholder={placeholder}
    className={className}
    onKeyPress={onKeyPress}
    onChange={onChange}
    required={isRequired}
    style={style}
    aria-label={label}
    aria-required="true"
    role="search"
  />
);

InputField.propTypes = {
  type: PropTypes.string,
  lang: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  maxLength: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onKeyPress: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  isRequired: PropTypes.bool,
  style: PropTypes.object,
  label: PropTypes.string,
};

InputField.defaultProps = {
  type: 'text',
  lang: 'en',
  name: 'InputField',
  isRequired: false,
};

export default InputField;
