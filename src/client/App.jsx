import React from 'react';
import ReactDOM from 'react-dom';

import alt from 'dgx-alt-center';
import ga from 'react-ga';
import a11y from 'react-a11y';
import FeatureFlags from 'dgx-feature-flags';
import Iso from 'iso';

import './styles/main.scss';

import App from '../app/components/Application/Application.jsx';

// Accessibility checking. Call react-a11y here if loadA11y is true
if (loadA11y) {
  a11y(React, { ReactDOM, includeSrcNode: true });
}

window.onload = () => {
  if (!window.ga) {
    console.log('Analytics not available - loading through React.');
    let gaOpts = { debug: false };
    ga.initialize('UA-1420324-3', gaOpts);
  }

  if (!window.dgxFeatureFlags) {
    window.dgxFeatureFlags = FeatureFlags.utils;
  }

  FeatureFlags.utils.activateFeature('shop-link');

  // Render Isomorphically
  Iso.bootstrap((state, container) => {
    let node = document.getElementById('app');

    console.log('Application rendered Isomorphically.');

    alt.bootstrap(state);
    ReactDOM.render(<App />, container);
  });
};
