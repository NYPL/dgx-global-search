# NYPL Global Search

This repository is the global search application for nypl.org.

### URL
https://www.nypl.org/search

### Version
> v1.1.1

### Installation
Install all dependencies listed under package.json
```sh
$ npm install
```

### Linting
From the CLI, run `npm run lint` to run the ESLint tool for checking JavaScript syntax.  Here is an example of how to lint only one file: `npm run lint-single-file src/app/components/TabItem/TabItem.jsx`

### Environment Variables
We use four environment variables so far for this application.

  - `API_ROOT` indicates the root of the endpoint this app calls for search requests.
  - `APP_ENV` indicates the environment the app is running in. It could be `development`, `qa`, or `production`. The default value is `production`.
  - `NODE_ENV` indicates if the app is running locally or on a remote server. It could be `development` or `production`. The default value is `development`.
  - `REGION_ENV` indicates the region where the app's AWS Elastic Beanstalk instance is. If it is not specified, the default value will be `us-east-1`.
  - `SKIP_CACHING` an optional variable that can be set to `true` if you don't want to use caching

### Development Mode
We use Webpack to fire off a hot-reloading development server. This allows for continuous code changes without the need to refresh your browser.

You do not need any environment variables if you want to run it locally in development mode. However, you will need valid AWS credentials stored locally and correct AWS Elastic Beanstalk Region to decrypt the correct API endpoint for search. Contact NYPL Digital Department for further information.

To run locally, run:
`npm start`

You will need to have a redis server running in another tab if you want to use caching:
`redis-server`
Download redis here:
`https://redis.io/topics/quickstart`

If you don't want to use caching, you can run:
`SKIP_CACHING=true npm start`
To avoid logging errors related to lack of caching.

You can also set the APP_ENV variable which dictates what API environment to use as the main source.
```sh
$ APP_ENV=development|qa|production npm start // Starts localhost:3001 with set APP_ENV
```

You can set API_ROOT directly as well if you have the info. Notice it needs to be decrypted. For example,

```sh
$ API_ROOT=https://somethingsomething.com node index
```

If you did not set API_ROOT, the app will try to call AWS KMS to decrypt the encypted API root in `appConfig.js` based on the APP_ENV.

### Production Mode
We use Webpack to fire off a hot-reloading development server. This allows for continuous code changes without the need to refresh your browser.

```sh
$ npm run dist // Builds dist path & files
$ APP_ENV=production NODE_ENV=production npm start // Starts localhost:3001 with set APP_ENV
```

### Deployment
NYPL Digital uses Travis to help deploy this application. With the configurations in .travis.yml, we can deploy the branch we want by just pushing it and then Travis will take care of the deployment.

Now we have three environments, `nypl-global-search-production`, `nypl-global-search-qa`, and `nypl-global-search-development`. They are deployed from three branches respectively, `master`, `qa`, and `development`. Once the feature branch is merged into one of these three branches and then pushed, Travis will start to run installation and execute tests. If the tests are passed, Travis will start to deploy to AWS. If a new environment is created, make sure it can access our API endpoint by adding its public IP to the IP restrictions of the API key in the Google console.

We can track the activities of Travis here,
https://travis-ci.org/NYPL/dgx-global-search

`nypl-global-search-production` and `nypl-global-search-qa` belong to `nypl-digital-dev` on AWS. and `nypl-global-search-development` belong to `nypl-sandbox`. For checking the activities either of the AWS accounts, log in
https://console.aws.amazon.com

You will need the credentials. Please contact NYPL Digital if you need one.

### Updating API Keys

We have IP restrictions for our Google CSE API keys. These API keys have to be updated for security reasons, and should
be updated with caution.

DO:

- Make sure of the IP addresses for qa and production EC2 instances. These can be found by ssh-ing onto the instance
(note that there are two production instances)
- Generate a new API key with the new IP addresses and the NYPL address (this is done in Google console)
- Change the API_ROOT environment variable on AWS in qa to match this API key
- Check that it is still working. Remember it can take a few minutes for the API key and environment variable updates to take effect
- Check that production EC2 instances can hit CSE using the new endpoint
- Update the production API_ROOT environment variable AND the endpoints in appConfig
- Check that there are no errors
- Check the logs to make sure the correct endpoint is being used
- At this point the old API keys can be deleted
- If there is a problem with the new API keys, the easiest way to restore production to a working set up is to remove the IP
restrictions from the new key

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
