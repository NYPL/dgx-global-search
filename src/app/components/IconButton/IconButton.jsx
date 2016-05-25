import React from 'react';

const IconButton = ({ id, className, onClick, icon }) => (
  <button
    id={id}
    className={className}
    onClick={onClick}
  >
    {icon}
  </button>
);

IconButton.propTypes = {
  onClick: React.PropTypes.func,
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  icon: React.PropTypes.object,
};

export default IconButton;
