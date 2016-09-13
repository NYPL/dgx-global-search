import React from 'react';

import { BasicButton } from 'dgx-react-buttons';
import { XIcon } from 'dgx-svg-icons';

const CloseButton = ({
  className,
  fill,
  id,
  onClick,
  title,
}) => (
  <BasicButton
    id={id}
    className={className}
    onClick={onClick}
    icon={
      <XIcon
        className={`${className}-xIcon`}
        fill={fill}
        title={title}
      />
    }
    label="Close"
    labelAccessible
  />
);

CloseButton.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  title: React.PropTypes.string,
  fill: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

CloseButton.defaultProps = {
  lang: 'en',
  id: 'closeButton',
  className: 'closeButton',
};

export default CloseButton;
