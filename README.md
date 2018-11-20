# NYPL Global Search

This repository is the global search application for nypl.org.

### URL
https://www.nypl.org/search

### Version
> v0.3.12

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
NYPL Digital uses Travis to help deploy this application. With the configurations in .travis.yml, we can deploy the branch we want by just pushing it and then Travis will take care of the deployment.

Now we have three environments, `nypl-global-search-production`, `nypl-global-search-qa`, and `nypl-global-search-development`. They are deployed from three branches respectively, `master`, `qa`, and `development`. Once the feature branch is merged into one of these three branches and then pushed, Travis will start to run installation and execute tests. If the tests are passed, Travis will start to deploy to AWS.

We can track the activities of Travis here,
https://travis-ci.org/NYPL/dgx-global-search

`nypl-global-search-production` and `nypl-global-search-qa` belong to `nypl-digital-dev` on AWS. and `nypl-global-search-development` belong to `nypl-sandbox`. For checking the activities either of the AWS accounts, log in
https://console.aws.amazon.com

You will need the credentials. Please contact NYPL Digital if you need one.

#### For deploying a feature branch to one of the environments
Sometimes, we need to test a feature branch at one of the environments, so we need to deploy the branch. For doing that, change the value of `branch` in `.travis.yml` under each environment (deploy/on/branch) from `master`, `qa`, or `development` to the name of the feature branch. Save, commit, and push it just as the regular deployments.

#### For pushing to remote without a deployment
Sometimes, we want to push the commit but also keep the current version on the environment for testing. For doing that, at the commit you want to push, add [skip ci] anywhere (preferable in the beginning to keep them consistent), so Travis will ignore this commit.


Contributors
----
NYPL Digital Experience
