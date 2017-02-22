# NYPL Global Search

This repository is the global search application for nypl.org

### Version
> v0.1.7

### Installation
Install all dependencies listed under package.json
```sh
$ npm install
```

### Development Mode
We use Webpack to fire off a hot-reloading development server. This allows for continuous code changes without the need to refresh your browser.

```sh
$ npm start // Starts localhost:3001 defaulting to APP_ENV=development
```

You can also set the APP_ENV variable which dictates what API environment to use as the main source.
```sh
$ APP_ENV=development|qa|production npm start // Starts localhost:3001 with set APP_ENV
```

### Production Mode
We use Webpack to fire off a hot-reloading development server. This allows for continous code changes without the need to refresh your browser.

```sh
$ npm run dist // Builds dist path & files
$ APP_ENV=production NODE_ENV=production npm start // Starts localhost:3001 with set APP_ENV
```

## Changelog

### v0.1.7
#### Updated
-Updated the Header Component to v1.5.3. The update is to remove console loggings for patron token expiration.

- Updated the Header Component to v1.5.2. The update is to turn off the feature flag of OAuth Login and set it as default.

### v0.1.6
#### Updated
- Updated the Header Component to v1.5.1. The update includes HTTPS fix and the JavaScript fallback for the log in button on the Header Component.

### v0.1.5
#### Added
- Enabled Feature Flags plugin on the client-side and added Optimizely script in the index.ejs file.

Contributors
----
NYPL Digital Experience
