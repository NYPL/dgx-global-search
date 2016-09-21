import React from 'react';

const ReturnLink = ({
  inputValue,
}) => (
  <div className="returnLink">
    <div>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSeVDEHXML7u86Lm_0rWitS17JrbJjNDWPuK2fhA9URyaXEpNA/viewform"
        target="_blank"
      >
        Take a survey about our new search tool
      </a>
      <span>
        &nbsp;or&nbsp;
      </span>
      <a
        href={`/search/apachesolr_search/${inputValue}`}
      >
        return to the current version
      </a>
      .
    </div>
  </div>
);

ReturnLink.propTypes = {
  inputValue: React.PropTypes.string,
};

export default ReturnLink;
