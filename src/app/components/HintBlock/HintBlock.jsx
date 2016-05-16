import React from 'react';

const HintBlock = ({className, message}) => (
  <div className={className}>
    <div className="closeButton">X</div>
    <p>{message}</p>
  </div>
);

export default HintBlock;