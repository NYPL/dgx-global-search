import React from 'react';

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
  status: React.PropTypes.bool,
  title: React.PropTypes.string,
};

LoadingLayer.defaultProps = {
  status: false,
};

export default LoadingLayer;
