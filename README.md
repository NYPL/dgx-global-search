# NYPL Global Search

This repository is the global search application for nypl.org

### Version
> v0.3.1

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

Contributors
----
NYPL Digital Experience
