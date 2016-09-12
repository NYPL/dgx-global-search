import React from 'react';

import { BasicButton } from 'dgx-react-buttons';
import { CheckSoloIcon } from 'dgx-svg-icons';

const ApplyButton = ({
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
      <CheckSoloIcon
        ariaHidden
        className={`${className}-checkSoloIcon`}
        height={height}
        title={title}
        viewBox={viewBox}
        width={width}
      />
    }
    label="APPLY"
    labelAccessible
  />
);

ApplyButton.propTypes = {
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

ApplyButton.defaultProps = {
  lang: 'en',
  id: 'applyButton',
  className: 'applyButton',
};

export default ApplyButton;
