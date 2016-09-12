import React from 'react';

import { BasicButton } from 'dgx-react-buttons';
import { XIcon } from 'dgx-svg-icons';

const CloseButton = ({
  ariaHidden,
  className,
  fill,
  height,
  id,
  onClick,
  title,
  width,
  viewBox,
}) => (
  <BasicButton
    id={id}
    className={className}
    onClick={onClick}
    icon={
      <XIcon
        ariaHidden={ariaHidden}
        className={`${className}-xIcon`}
        fill={fill}
        height={height}
        title={title}
        viewBox={viewBox}
        width={width}
      />
    }
    label="Close"
    labelAccessible
  />
);

CloseButton.propTypes = {
  ariaHidden: React.PropTypes.bool,
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  title: React.PropTypes.string,
  width: React.PropTypes.string,
  height: React.PropTypes.string,
  fill: React.PropTypes.string,
  viewBox: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

CloseButton.defaultProps = {
  lang: 'en',
  id: 'closeButton',
  className: 'closeButton',
};

export default CloseButton;
