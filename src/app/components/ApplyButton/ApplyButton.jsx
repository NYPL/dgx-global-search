import React from 'react';

import { BasicButton } from 'dgx-react-buttons';
import { CheckSoloIcon } from 'dgx-svg-icons';

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
        className={`${className}-checkSoloIcon`}
        title={title}
      />
    }
    label="APPLY"
    labelAccessible
  />
);

ApplyButton.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  title: React.PropTypes.string,
  fill: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

ApplyButton.defaultProps = {
  lang: 'en',
  id: 'applyButton',
  className: 'applyButton',
};

export default ApplyButton;
