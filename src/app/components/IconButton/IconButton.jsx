import React from 'react';

class IconButton extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    // this.props.onClick();
    console.log('close button clicked');
  }

  render() {
    return (
      <button
        className={this.props.className}
        onClick={this.onClick}
      >
        {this.props.icon}
      </button>
    );
  }
}

IconButton.propTypes = {
  onClick: React.PropTypes.func,
  className: React.PropTypes.string,
  icon: React.PropTypes.object,
};

export default IconButton;
