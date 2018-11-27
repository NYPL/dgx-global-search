import React from 'react';
import PropTypes from 'prop-types';

const ReturnLink = ({
  linkRoot,
  inputValue,
}) => (
  <div className="returnLink gs-results-paginationButton-wrapper">
    <a
      href={`${linkRoot}${inputValue}`}
    >
      Visit Old Version of NYPL.org Search >
    </a>
  </div>
);

ReturnLink.propTypes = {
  inputValue: PropTypes.string,
};

export default ReturnLink;
