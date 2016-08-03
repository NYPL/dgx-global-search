import React from 'react';

// Import libraries
import { CircleDashIcon } from 'dgx-svg-icons';

class FilterItem extends React.Component {
  constructor(props) {
    super(props);

    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress(event) {
    if (event && event.charCode === 13) {
      this.props.onClick();
    }
  }

  render() {
    return (
      <li
        className={this.props.className}
        onClick={this.props.onClick}
        onKeyPress={this.onKeyPress}
        tabIndex="0"
      >
        {this.props.label}
        <CircleDashIcon className={`circleDashIcon ${this.props.className}`} />
      </li>
    );
  }
}

FilterItem.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
  label: React.PropTypes.string,
};

FilterItem.defaultProps = {
  lang: 'en',
  id: '',
  className: 'filterItem',
  label: '',
};

export default FilterItem;
