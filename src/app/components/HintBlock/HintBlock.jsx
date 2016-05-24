import React from 'react';

import CloseButton from '../CloseButton/CloseButton.jsx';

const HintBlock = ({
  id,
  className,
  message,
}) => (
  <div id={id} className={className}>
    <CloseButton className="closeButton" />
    {message}
  </div>
);

HintBlock.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  message: React.PropTypes.object,
};

export default HintBlock;
