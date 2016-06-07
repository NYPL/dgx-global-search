import React from 'react';

import CloseButton from '../CloseButton/CloseButton.jsx';

const HintBlock = ({
  id,
  className,
  message,
}) => (
  <div id={id} className={className}>
    <CloseButton
      id={`${id}-closeButton`}
      ariaHidden
      className={`${className}-closeButton`}
      fill="#837E77"
      height="32"
      title="x.icon.svg"
      viewBox="0 0 32 32"
      width="32"
    />
    {message}
  </div>
);

HintBlock.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  message: React.PropTypes.object,
};

export default HintBlock;
