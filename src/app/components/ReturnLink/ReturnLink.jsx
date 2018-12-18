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
      View your search in our previous search tool >
    </a>
  </div>
);

ReturnLink.propTypes = {
  inputValue: PropTypes.string,
};

export default ReturnLink;
