import React from 'react';

class IconButton extends React.Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  _onClick(e) {
    e.preventDefault();
    // this.props.onClick();
    console.log('close button clicked');
  }

  render() {
    return (
      <span
        className={this.props.className}
        onClick={this._onClick}
      >
        {this.props.icon}
      </span>
    );
  }
}

IconButton.propTypes = {
  onClick: React.PropTypes.func,
  className: React.PropTypes.string,
  icon: React.PropTypes.object,
};

export default IconButton;
