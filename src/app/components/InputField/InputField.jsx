import React from 'react';

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
  />
);

InputField.propTypes = {
  type: React.PropTypes.string,
  lang: React.PropTypes.string,
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  value: React.PropTypes.string,
  checked: React.PropTypes.bool,
  maxLength: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  className: React.PropTypes.string,
  onKeyPress: React.PropTypes.func,
  onChange: React.PropTypes.func,
  required: React.PropTypes.bool,
  isRequired: React.PropTypes.bool,
  style: React.PropTypes.object,
  label: React.PropTypes.string,
};

InputField.defaultProps = {
  type: 'text',
  lang: 'en',
  name: 'InputField',
  isRequired: false,
};

export default InputField;
