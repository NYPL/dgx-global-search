import React from 'react';

import { XIcon } from 'dgx-svg-icons';

class CloseButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        id={this.props.id}
        className={this.props.className}
        onClick={this.props.onClick}
      >
        <XIcon
          ariaHidden={true}
          className={`${this.props.className}-xIcon`}
          fill={this.props.fill}
          height={this.props.height}
          title="x.icon.svg"
          viewBox={this.props.viewBox}
          width={this.props.width}
        />
      </button>
    );
  }
}

CloseButton.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  width: React.PropTypes.string,
  height: React.PropTypes.string,
  fill: React.PropTypes.string,
  clickClose: React.PropTypes.func,
};

CloseButton.defaultProps = {
  lang: 'en',
  id: 'closeButton',
  className: 'closeButton',
};

export default CloseButton;
