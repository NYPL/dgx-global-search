import React from 'react';

import IconButton from '../IconButton/IconButton.jsx';

const icon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="2rem" height="2rem">
    <title>solo.x</title>
   <polygon points="65.2 34.95 61.2 30.94 48.07 44.07 34.95 30.94 30.94 34.95 44.07 48.07 30.94 61.2 34.95 65.2 48.07 52.08 61.2 65.2 65.2 61.2 52.08 48.07 65.2 34.95" />
  </svg>
);

const CloseButton = ({ className }) => (
  <IconButton className={className} icon={icon} />
);

export default CloseButton;