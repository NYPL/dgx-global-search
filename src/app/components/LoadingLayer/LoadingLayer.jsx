import React from 'react';
import PropTypes from 'prop-types';

import LoadingDots from '../LoadingDots/LoadingDots.jsx';

class LoadingLayer extends React.Component {
  render() {
    if (this.props.status === false) {
      return null;
    }

    return (
      <div className="loadingLayer">
        <div className="loadingLayer-layer"></div>
        <div className="loadingLayer-texts">
          <span className="loadingLayer-texts-loadingWord">Loading...</span>
          <span className="loadingLayer-texts-title">
            {this.props.title}
          </span>
          <LoadingDots />
        </div>
      </div>
    );
  }
}

LoadingLayer.propTypes = {
  status: PropTypes.bool,
  title: PropTypes.string,
};

LoadingLayer.defaultProps = {
  status: false,
};

export default LoadingLayer;
