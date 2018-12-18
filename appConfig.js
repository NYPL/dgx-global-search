export default {
  appTitle: 'Search NYPL.org',
  appName: 'NYPL Global Search',
  favIconPath: '//d2znry4lg8s0tq.cloudfront.net/images/favicon.ico',
  port: 3001,
  webpackDevServerPort: 3000,
  api: {
    root: {
      development: 'https://dev-refinery.nypl.org',
      qa: 'https://qa-refinery.nypl.org',
      production: 'https://refinery.nypl.org',
    },
  },
  searchApi: {
    endpoint: '/api/nypl/ndo/v0.1/searches/global-searches/default',
    includes: [
      'facets',
      'items',
    ],
    filters: {
      q: '',
    },
  },
};
