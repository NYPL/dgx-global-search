import React from 'react';

import CloseButton from '../CloseButton/CloseButton.jsx';

const HintBlock = ({ className, message }) => (
  <div className={className}>
    <CloseButton className="closeButton" />
    <p>{message}</p>
  </div>
);

HintBlock.propTypes = {
  className: React.PropTypes.string,
  message: React.PropTypes.string,
};

export default HintBlock;
