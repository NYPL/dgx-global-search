import React from 'react';

import IconButton from '../IconButton/IconButton.jsx';


class CloseButton extends React.Component {
  constructor(props) {
    super(props);

    this.icon = this.icon.bind(this);
  }

  icon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width={this.props.width}
        height={this.props.height}
        fill={this.props.fill}
      >
        <title>solo.x</title>
        <polygon
          points={'54.26 6.34 47.91 0 27.13 20.79 6.34 0 0 6.34 20.79 27.13 0 47.91 6.34 54.26 ' +
            '27.13 33.47 47.91 54.26 54.26 47.91 33.47 27.13 54.26 6.34'}
        />
      </svg>
    );
  };

  render() {
    return(
      <IconButton
        className={this.props.className}
        icon={this.icon()}
        onClick={this.props.clickClose}
      />
    );
  }
}

CloseButton.propTypes = {
  className: React.PropTypes.string,
  fill: React.PropTypes.string,
};

export default CloseButton;
