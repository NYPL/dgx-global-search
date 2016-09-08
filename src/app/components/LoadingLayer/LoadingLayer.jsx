import React from 'react';

import LoadingDots from '../LoadingDots/LoadingDots.jsx';

class LoadingLayer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let seriesTitlePart = '';

    if (this.props.title.length > 0) {
      seriesTitlePart = ' | ' + this.props.title;
    }

    if (this.props.status === false) {
      return null;
    }

    return (
      <div className="loadingLayer">
        <div className="loadingLayer-layer"></div>
        <div className="loadingLayer-texts">
          <span className="loadingLayer-texts-loadingWord">Loading...</span>
          <span className="loadingLayer-texts-title">
            {this.props.title}{seriesTitlePart}
          </span>
          <LoadingDots />
        </div>
      </div>
    );
  }
}

LoadingLayer.defaultProps = {
  status: false,
}

export default LoadingLayer;
