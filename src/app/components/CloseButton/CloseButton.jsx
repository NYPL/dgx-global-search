import React from 'react';
import PropTypes from 'prop-types';

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
  id: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  fill: PropTypes.string,
  onClick: PropTypes.func,
};

CloseButton.defaultProps = {
  lang: 'en',
  id: 'closeButton',
  className: 'closeButton',
};

export default CloseButton;
