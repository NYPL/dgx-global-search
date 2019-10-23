# NYPL Global Search

This repository is the global search application for nypl.org.

### URL
https://www.nypl.org/search

### Version
> v1.1.7

### Installation
Install all dependencies listed under package.json
```sh
$ npm install
```

### Linting
From the CLI, run `npm run lint` to run the ESLint tool for checking JavaScript syntax.  Here is an example of how to lint only one file: `npm run lint-single-file src/app/components/TabItem/TabItem.jsx`

### Environment Variables

The following environment variables are used by this application:

  - `API_ROOT` indicates the root of the endpoint this app calls for search requests.
  - `APP_ENV` indicates the environment the app is running in. It could be `development`, `qa`, or `production`. If left unset, the app connects to production Google Search API and `localhost` redis (See [.env-sample](./.env-sample) for more info.)
  - `NODE_ENV` indicates if the app is running locally or on a remote server. It could be `development` or `production`. The default value is `development`.
  - `REGION_ENV` indicates the region where the app's AWS Elastic Beanstalk instance is. If it is not specified, the default value will be `us-east-1`.
  - `SKIP_CACHING` an optional variable that can be set to `true` if you don't want to use caching
  - `AWS_PROFILE` an optional variable that can be used to set the AWS profile the app will use. It will usually be either
  `nypl-sandbox` or `nypl-digital-dev`. You should not have to set this variable unless you are running in production mode locally.

See [.env-sample](./.env-sample) for an example `.env` file with more information.

As a convenience, you may choose to `cp .env-sample .env`, modify the variables therein, and then run the app via `source .env; npm start`.

### Development Mode

Without setting any environmental variables, the following will start the server in development mode (i.e. Webpack hot-reloading) and connect to the `production` Google Search API:

`SKIP_CACHING=true npm start`

We use Webpack to fire off a hot-reloading development server. This allows for continuous code changes without the need to refresh your browser.

Note the above assumes you have valid AWS credentials associated with profile "nypl-digital-dev". Contact NYPL Digital Department to establish your `nypl-digital-dev` and `nypl-sandbox` accounts.

#### Local Redis

To run locally against a local Redis, [download Redis](https://redis.io/topics/quickstart), start it (i.e. run `redis-server` in another tab), and then run:

```
# Make sure APP_ENV= so that app doesn't connect to a remote Redis
APP_ENV= npm start
```

#### Running locally in "Development Mode" against different remote environments

See [.env-sample](./.env-sample) for the full impact of setting `APP_ENV`, but you can connect to different combinations of Google and Redis environments via:

```sh
$ AWS_PROFILE=nypl-digital-dev|nypl-sandbox APP_ENV=development|qa|production npm start
```

*Note that `AWS_PROFILE` is required when connecting to remote redis locally. This is due to a bug wherein the remote Redis host decryption is not performed against an established profile. (Decryption of Google endpoints is performed against auto-detected AWS profile.) As a consequence, unless you've disabled caching, you'll need to use an `AWS_PROFILE` appropriate for your `APP_ENV`.*

You can set API_ROOT directly as well if you have the info. Notice it needs to be decrypted. For example,

```sh
$ API_ROOT=https://somethingsomething.com node index
```

If you did not set API_ROOT, the app will try to call AWS KMS to decrypt the encypted API root in `appConfig.js` based on the APP_ENV.

### Production Mode
We use Webpack to fire off a hot-reloading development server. This allows for continuous code changes without the need to refresh your browser.

```sh
$ npm run dist // Builds dist path & files
$ AWS_PROFILE=nypl-digital-dev APP_ENV=production NODE_ENV=production npm start // Starts localhost:3001 with set APP_ENV
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
- If there is a problem with the new API keys, the easiest way to restore production to a working state is to remove the IP
restrictions from the new key

### PR Review and Deployment with Travis

Steps to add a feature:

- Cut feature branch from `pr_approved`
- Merge feature to `development` to trigger a development deploy
- Create PR to merge feature into `pr_approved` (Link to development URL in PR)
- When approved, merge `pr_approved` > `qa`
- Finally merge `pr_approved` > `master`

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
