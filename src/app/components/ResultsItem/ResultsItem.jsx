import React from 'react';

class SearchResult extends React.Component {
  constructor(props) {
    super(props);

    this.renderImage = this.renderImage.bind(this);
  }

  renderImage() {
    if (!this.props.thumbnailSrc) {
      return null;
    }

    return (
      <img
        src={this.props.thumbnailSrc}
        alt={this.props.title}
        style={SearchResult.styles.thumbnailImage}
      />
    );
  }

  render() {
    return (
    <li id={`${this.props.id}-${this.props.index}`} className={this.props.className}>
      <p className={`${this.props.className}-label`}>{this.props.label}</p>
      <a
        className={`${this.props.className}-link`}
        href={this.props.link}
      >
        {this.renderImage()}
        <h3>{this.props.title}</h3>
      </a>
      <p className={`${this.props.className}-linkText`}>{this.props.link}</p>
      <p className={`${this.props.className}-snippet`}>{this.props.snippet}</p>
    </li>
    );
  }
}

SearchResult.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  index: React.PropTypes.number,
  title: React.PropTypes.string,
  link: React.PropTypes.string,
  snippet: React.PropTypes.string,
  thumbnailSrc: React.PropTypes.string,
  label: React.PropTypes.string,
};

SearchResult.defaultProps = {
  lang: 'en',
  id: 'searchResult',
  className: 'searchResult',
  index: 0,
};

SearchResult.styles = {
  thumbnailImage: {
    display: 'none',
    height: '200px',
  },
};

export default SearchResult;
