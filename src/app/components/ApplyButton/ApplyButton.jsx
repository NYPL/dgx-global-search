import React from 'react';
import PropTypes from 'prop-types';

import { BasicButton } from 'dgx-react-buttons';
import { CheckSoloIcon } from '@nypl/dgx-svg-icons';

const ApplyButton = ({
  className,
  id,
  onClick,
  title,
}) => (
  <BasicButton
    id={id}
    className={className}
    onClick={onClick}
    icon={
      <CheckSoloIcon
        ariaHidden
        className={`${className}-checkSoloIcon`}
        title={title}
      />
    }
    label="APPLY"
    labelAccessible
  />
);

ApplyButton.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  fill: PropTypes.string,
  onClick: PropTypes.func,
};

ApplyButton.defaultProps = {
  lang: 'en',
  id: 'applyButton',
  className: 'applyButton',
};

export default ApplyButton;
