import React from 'react';
import ReactDOM from 'react-dom';

import alt from 'dgx-alt-center';
import { config, gaUtils, ga } from 'dgx-react-ga';
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
    const isProd = process.env.NODE_ENV === 'production';
    const gaOpts = {
      debug: !isProd,
      titleCase: false,
      gaOptions: {
        allowLinker: true,
      },
    };

    gaUtils.initialize(config.google.code(isProd), gaOpts);
    // The settings related to linker is for convio.net, that allows convio.net to get the client ID from NYPL
    // So its tracker will know that the patrons came from NYPL's domain
    ga.ga('require', 'linker');
    ga.ga('linker:autoLink', ['convio.net']);
    ga.ga('set', 'anonymizeIp', true);
  }

  if (!window.dgxFeatureFlags) {
    window.dgxFeatureFlags = FeatureFlags.utils;
  }

  // Render Isomorphically
  Iso.bootstrap((state, container) => {
    let node = document.getElementById('app');

    console.log('Application rendered Isomorphically.');

    alt.bootstrap(state);
    ReactDOM.render(<App />, container);
  });

  gaUtils.trackPageview(window.location.pathname);
};
