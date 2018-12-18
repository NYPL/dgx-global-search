# NYPL Global Search

This repository is the global search application for nypl.org.

### URL
https://www.nypl.org/search

### Version
> v1.0.0

### Installation
Install all dependencies listed under package.json
```sh
$ npm install
```

### Linting
From the CLI, run `npm run lint` to run the ESLint tool for checking JavaScript syntax.  Here is an example of how to lint only one file: `npm run lint-single-file src/app/components/TabItem/TabItem.jsx`

### Development Mode
We use Webpack to fire off a hot-reloading development server. This allows for continuous code changes without the need to refresh your browser.

To run locally, run:
`API_ROOT='ENTER_URL_WITH_CREDENTIALS_HERE' node index`. You will have to change the string `ENTER_URL_WITH_CREDENTIALS_HERE` in the 'local' script in package.json to the actual API endpoint. Leave the quotation marks. Get this from a coworker.

You can also set the APP_ENV variable which dictates what API environment to use as the main source.
```sh
$ APP_ENV=development|qa|production npm start // Starts localhost:3001 with set APP_ENV
```

### Production Mode
We use Webpack to fire off a hot-reloading development server. This allows for continuous code changes without the need to refresh your browser.

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

#### PR Review and Deployment with Travis
CREATING A NEW BRANCH

When starting work on a new feature, developers should cut their feature branches off of the `pr_approved` branch.

CREATING A NEW PR

The pr_approved branch reflects all work that has been approved in a PR.  This means that when a developer creates a PR, the base branch should be the `pr_approved` branch.

TESTING A FEATURE ON THE DEVELOPMENT SERVER

When a developer is ready to create a new PR, they should use the CLI to merge their feature branch into the development branch and push it to the `development` branch on GitHub.  This will cause Travis to deploy the `development` branch to the development server.

DEPLOYMENT BY TRAVIS

The travis.yml file states that these branches get deployed to these environments:

* `development` branch deploys to development server
* `pr_approved` branch does not deploy anywhere
* `qa` branch deploys to qa server
* `master` branch deploys to production server

#### For pushing to remote without a deployment
Sometimes, we want to push the commit but also keep the current version on the environment for testing. For doing that, at the commit you want to push, add `[skip ci]` anywhere (preferable in the beginning to keep them consistent), so Travis will ignore this commit.


Contributors
----
NYPL Digital Experience
