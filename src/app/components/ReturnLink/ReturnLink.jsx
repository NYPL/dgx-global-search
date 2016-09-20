import React from 'react';

import { LeftWedgeIcon } from 'dgx-svg-icons';

const ReturnLink = ({
  inputValue,
}) => (
  <div className="returnLink">
    <a
      href={`/search/apachesolr_search/${inputValue}`}
    >
      <LeftWedgeIcon />
      Return to the current version of NYPL.org Search
    </a>
  </div>
);

ReturnLink.propTypes = {
  inputValue: React.PropTypes.string,
};

export default ReturnLink;
