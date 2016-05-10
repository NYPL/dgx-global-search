import React from 'react';

class InputField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input
        id={this.props.id}
        lang={this.props.lang}
        type={this.props.type}
        name={this.props.name}
        value={this.props.value}
        checked={this.props.checked}
        maxLength={this.props.maxLength}
        placeholder={this.props.placeholder}
        className={this.props.className}
        onClick={this.props.onClick}
        onChange={this.props.onChange}
        required={this.props.isRequired || false}
        style={[styles.base, this.props.style]}
      />
    );
  }
}

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
  onClick: React.PropTypes.func,
  onChange: React.PropTypes.func,
  required: React.PropTypes.bool,
  isRequired: React.PropTypes.bool,
  style: React.PropTypes.object,
};

InputField.defaultProps = {
  type: 'text',
  lang: 'en',
  name: 'InputField',
};

export default InputField;
