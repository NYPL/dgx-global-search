# NYPL Global Search

This repository is the global search application for nypl.org. 

### URL
https://www.nypl.org/searchbeta

### Version
> v0.3.3

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

### Deployment
We use Travis to help us deploy, and before deploy, test the updates.
In `.travis.yml`, there are three environments:
`nypl-global-search-production`, `nypl-global-search-qa`, and `nypl-global-search-development`. These three environments will be delpoyed based on three branches respectively, `master`, `qa`, and `development` by default. Once a feature branch is merged to these three branches and either of the three branches is pushed, Travis will automatically execute to install dependencies and test the updates. If all the tests are passed, it will then trigger AWS to deploy.

Travis main page: https://travis-ci.org/NYPL/

On AWS, `nypl-global-search-production`, `nypl-global-search-qa` are under `nypl-digital-dev` account, and `nypl-global-search-development` is under `nypl-sandbox` account.

Log in AWS main page: https://console.aws.amazon.com

If you want to deloy your feature branch to `nypl-global-search-development` for testing before merging it to `development`. Go to `.travis.yml` and update the branch value on line 53.


Contributors
----
NYPL Digital Experience
