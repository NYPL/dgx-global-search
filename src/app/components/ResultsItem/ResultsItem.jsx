import React from 'react';

class ResultsItem extends React.Component {
  constructor(props) {
    super(props);

    this.renderImage = this.renderImage.bind(this);
  }

  /**
   * renderImage()
   * The function render <img> if this.props.thumbnailSrc is true.
   *
   * @return null or object
   */
  renderImage(className, src, title) {
    if (!src) {
      return null;
    }

    return (
      <div className={`${className}-imageWrapper`}>
        <img
          className={`${className}-image`}
          src={src}
          alt={title}
        />
      </div>
    );
  }

  render() {
    const wholeRow = (this.props.thumbnailSrc) ? '' : 'whole-row';

    return (
      <li id={`${this.props.id}-${this.props.index}`} className={this.props.className}>
        <p className={`${this.props.className}-label ${wholeRow}`}>{this.props.label}</p>
        <a
          className={`${this.props.className}-link ${wholeRow}`}
          href={this.props.link}
        >
          {this.renderImage(this.props.className, this.props.thumbnailSrc, this.props.title)}
          <h3 className={`${this.props.className}-title ${wholeRow}`}>{this.props.title}</h3>
        </a>
        <p className={`${this.props.className}-linkText ${wholeRow}`}>{this.props.link}</p>
        <p className={`${this.props.className}-snippet ${wholeRow}`}>{this.props.snippet}</p>
      </li>
    );
  }
}

// const wholeRow = (thumbnailSrc) ? '' : 'whole-row';

// const ResultsItem = ({
//   className,
//   id,
//   index,
//   label,
//   link,
//   snippet,
//   title,
//   thumbnailSrc,
// }) => (
//   <li id={`${id}-${index}`} className={`${className} ${wholeRow}`}>
//     <p className={`${className}-label`}>{label}</p>
//     <a
//       className={`${className}-link`}
//       href={link}
//     >
//       {renderImage(className, thumbnailSrc, title)}
//       <h3>{title}</h3>
//     </a>
//     <p className={`${className}-linkText`}>{link}</p>
//     <p className={`${className}-snippet`}>{snippet}</p>
//   </li>
// );


ResultsItem.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  index: React.PropTypes.number,
  title: React.PropTypes.string,
  link: React.PropTypes.string,
  snippet: React.PropTypes.string,
  thumbnailSrc: React.PropTypes.string,
  label: React.PropTypes.string,
};

ResultsItem.defaultProps = {
  lang: 'en',
  id: 'resultsItem',
  className: 'resultsItem',
  index: 0,
};

export default ResultsItem;
