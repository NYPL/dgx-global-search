const aws = require('./lib/kms-helper.js');

const appConfig = {
  appTitle: 'Search NYPL.org',
  appName: 'NYPL Global Search',
  favIconPath: '//d2znry4lg8s0tq.cloudfront.net/images/favicon.ico',
  port: 3001,
  webpackDevServerPort: 3000,
  developmentUrl: "AQECAHjqALewp8JBJNxIQvR4oY795dyG7INaGR1glMsTEgetggAAAOAwgd0GCSqGSIb3DQEHBqCBzzCBzAIBADCBxgYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAwrpfidQJyiH76sz/4CARCAgZh0D3u9aSJa479opNksTwx2aHtaZpMVFVxo0NkNslXLWAbDB0orlfvY+zwBL6qQaxTUj6/E4nMXYoppW1i3xZOTs9ZoyfARZ25tgGSTRGeemnH2y4CDnm6/NGLQ8LbM+97Kl3wugc9Lj9oDS7NoPr0PW0tJI1fTULckuJYUV6plxye/iUJlg146/s1M0xnimerZJq+r3ZEvpg==",
  productionUrl: "AQECAHh7ea2tyZ6phZgT4B9BDKwguhlFtRC6hgt+7HbmeFsrsgAAAOAwgd0GCSqGSIb3DQEHBqCBzzCBzAIBADCBxgYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAw8VuZK2ac+xXYkFc0CARCAgZjpENBLb6xeL0x5vGsZYi1ErcggCs8iD0rNknyU68yjFZROq7Ygjx2QFS4QXGTaG0ZT8jCbGVLxr/XPAkPPtagGobI+VzCgYDneWaZRYZc67w0gyMIplQk+WxbDBTZrFvwpG+XYDEOBAy77Uma/41xLLFX/7UiVwycsd0k8rbSbWQGyEKDB3/Vpg7wLgvEIDZrhx//5tFYSzA==",
  apiRoot: '',
};

const appEnv = process.env.APP_ENV ? process.env.APP_ENV : 'production';

// set API_ROOT to the correct encrypted value

appConfig.apiRoot = appEnv === 'development' ? appConfig.developmentUrl : appConfig.productionUrl;

aws.setProfile(process.env.AWS_PROFILE);
aws.decrypt(appConfig.apiRoot).then(result => {appConfig.apiRoot = result.slice(1, result.length-1)});

export default appConfig;
