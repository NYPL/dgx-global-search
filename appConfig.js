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
  redisHosts: {
    production: 'AQECAHh7ea2tyZ6phZgT4B9BDKwguhlFtRC6hgt+7HbmeFsrsgAAAI8wgYwGCSqGSIb3DQEHBqB/MH0CAQAweAYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAx42jOJCpdg0W97u/wCARCAS/3U4AyWfkBxNXB7Zf55E+oMpM6JKGg2GWKYS6oB0NWG0/Ru1nyy+2PsaJTPQX7XY2iCT3ssS44V8fykc6NT6On2PPVCy73MbmvQFg==',
    qa: 'AQECAHh7ea2tyZ6phZgT4B9BDKwguhlFtRC6hgt+7HbmeFsrsgAAAI0wgYoGCSqGSIb3DQEHBqB9MHsCAQAwdgYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAwBf+pXqW8RD9ZNSp0CARCASbnVPP0P9ZHS5JD6iOCav6TZnHVrsQhGB+jaTiG6oFGKs617ZSwVrwzXk/K6UmjB8CNdNqFvXNOoVGscExhna7S0ReoY02928zA=',
  },
};
