import React from 'react';

import CloseButton from '../CloseButton/CloseButton.jsx';

const HintBlock = ({ className, message }) => (
  <div className={className}>
    <CloseButton className="closeButton" fill="#837E77"/>
    {message}
  </div>
);

HintBlock.propTypes = {
  className: React.PropTypes.string,
  message: React.PropTypes.object,
};

export default HintBlock;
