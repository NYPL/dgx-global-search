import React from 'react';

class IconButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        className={this.props.className}
        onClick={this.props.onClick}
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
