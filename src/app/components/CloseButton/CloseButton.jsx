import React from 'react';

import IconButton from '../IconButton/IconButton.jsx';

const icon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="1rem" height="1rem">
    <title>solo.x</title>
    <polygon
      points={'54.26 6.34 47.91 0 27.13 20.79 6.34 0 0 6.34 20.79 27.13 0 47.91 6.34 54.26 ' +
        '27.13 33.47 47.91 54.26 54.26 47.91 33.47 27.13 54.26 6.34'}
    />
  </svg>
);

const CloseButton = ({ className }) => (
  <IconButton className={className} icon={icon} />
);

CloseButton.propTypes = {
  className: React.PropTypes.string,
  icon: React.PropTypes.object,
};

export default CloseButton;
