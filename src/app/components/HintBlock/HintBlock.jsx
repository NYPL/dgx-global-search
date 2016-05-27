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
      title="x.icon.svg"
      width="32"
      height="32"
      fill="#837E77"
      viewBox="-8 8 32 32"
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
