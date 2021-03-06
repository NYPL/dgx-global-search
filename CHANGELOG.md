## Changelog

### v1.2.1
#### Updated
- Updating @nypl/dgx-header-component to 2.7.1.

### v1.2.0
#### Updated
- Updating babel-eslint to 10.1.0
- Updating eslint to 6.8.0
- Updating eslint-config-airbnb to 18.1.0
- Updating eslint-loader to 4.0.2
- Updating eslint-plugin-import to 2.20.2
- Updating eslint-plugin-jsx-a11y to 6.2.3
- Updating eslint-plugin-react to 7.19.0
- Updating aws-sdk to 2.664.0
- Updating axios to 0.19.2
- Updating @babel/core to 7.9.0
- Updating babel-loader to 8.1.0
- Updating @babel/preset-react to 7.9.4
- Updating @babel/register to 7.9.0
- Updating breakpoint-sass to 2.7.1
- Updating clean-webpack-plugin to 3.0.0
- Updating css-loader to 3.5.2
- Updating esdoc to 1.1.0
- Updating express to 4.17.1
- Updating mocha to 7.1.1
- Updating node-sass to 4.13.1
- Updating redis to 3.0.2
- Updating sass-loader to 8.0.2
- Updating style-loader to 1.1.4s
- Updating underscore to 1.10.2
- Updating webpack to 4.43.0
- Updating webpack-dev-server to 3.10.3
- Updating webpack-merge to 4.2.2
#### Added
- Adding terser-webpack-plugin
- Adding core-js
- Adding webpack-cli
- Adding @babel/preset-env; replaces babel-preset-es2015
- Adding mini-css-extract-plugin; replaces extract-text-plugin
- Adding terser-webpack-plugin; replaces calls to UglifyJS
- Adding esdoc plugins
- Adding winston v3; and logger.js
#### Replaced
- Replacing babel-preset-es2015
- Replacing extract-text-webpack-plugin
#### Removed
- Removing babel-polyfill; included with @babel/preset-env

### v1.1.10
#### Updated
- Updating @nypl/dgx-react-footer to 0.5.6.

### v1.1.9
- Updating @nypl/dgx-react-footer to 0.5.5.
- Updating Falcon CrowdStrike sensor to 5.29.

### v1.1.8
#### Updated
- Updating @nypl/dgx-react-footer to 0.5.4.

### v1.1.7
#### Updated
- Updating @nypl/dgx-header-component to 2.6.0

### v1.1.6
#### Updated
- Updating @nypl/dgx-header-component to 2.5.8

### v1.1.5
#### Updated
- Updating @nypl/dgx-header-component to 2.5.6

### v1.1.4
#### Added
- Added fix to skip CrowdStrike installation to prevent deployment failures.

### v1.1.3
#### Added
- Added Falcon CrowdStrike sensor to operating system.

### v1.1.2
#### Updated
- Updated @nypl/dgx-react-footer to 0.5.2.

### v1.1.1
#### Added
- Added error handling for adding caching.
#### Updated
- Added bolding of search keyword in result snippets and titles.

### v1.1.0
#### Updated
- Updating Results.jsx to move the functions related to modeling data out of it.
- Updating Results.jsx to remove the unnecessary function to parse the snippet of a result item.
- Tab attributes use tab names instead of numbers.
- The current tab is tracked from the selectedFacet property in the Store.
- Removing the related parameters for displaying loading status on the pages.
- Updating to display an empty result page if there is no valid search keyword after a client side search request.
#### Added
- Adding the instruction message to ask the user to enter a search keyword.
- Adding the methods to call AWS KMS service to decrypt the API root for search requests.
- Adding caching. This includes clientWrapper, cacheUtil, and cacheUtil.test
- Change ApiRoutes to cache results when using axios
- Document use of redis in README

### v1.0.1
#### Updated
- Updating @nypl/dgx-header-component to 2.4.19

### v1.0.0
#### Updated
- Removing role and aria-atomic from area that announces the search results
- Changing the label for the search field
- Removing loading screen
- Fixing JSON display bug
- Changing filter values
- Showing ARIA-live region on initial load of search page
- Making a div with a role of "search" that contains search functionality & results
- Improving desktop version of filter with keyboard navigation
- Adding commands for linting
- Updating the syntax for better formatting codes in Results.jsx
- Updating the texts for showing result information.
- Updating the functions to render tabs on mobile view and desktop view to fix the inconsistent selected tabs between viewports.
- Updating the function for getting URL paths so the results will be correct after hitting "Go back" button on browsers.
- Changing the "Load More" button to "View More" and removing the loading dots
- Updating Results.jsx for rendering a more accessibile HTML element of results summary.
- Speeding up the change in focus after clicking "View More"
#### Added
- Adding the link to search the catalog with the same search keywords.
- Add chevron to mobile dropdown
- Adding new PR workflow with a pr_approved branch.

### v0.3.10
#### Updated
- Updating @nypl/dgx-header-component to 2.4.15 and checking for QA in APP_ENV.

### v0.3.9
#### Updated
- Updating @nypl/dgx-header-component to 2.4.14 and set APP_ENV.

### v0.3.8
#### Updated
- Updating @nypl/dgx-header-component to 2.4.13.

### v0.3.7
#### Updated
- Updating @nypl/dgx-header-component to 2.4.12 and changing "searchbeta" to "search".

### v0.3.6
#### Updated
- Updating @nypl/dgx-react-footer version to 0.5.1 and @nypl/dgx-header-component to 2.4.11.

### v0.3.5
#### Updated
- Updating @nypl/dgx-react-footer version to 0.5.0 and @nypl/dgx-header-component to 2.4.8.

### v0.3.4
#### Updated
- Updated README.md for the new strategy of deployment.

### v0.3.3
#### Updated
- Updated the styles of filter apply button.

### v0.3.2
#### Updated
- Updated the Header component to v2.4.7.
#### Added
- Added OptinMonster for advocacy 2018.

### v0.3.1
#### Updated
- Updated the Header component to v2.4.5.

### v0.3.0
#### Added
- Added the function for tracking click through events for GA on the result page.
- Added the function for tracking search request (QuerySent) events for GA.

### v0.2.7
#### Updated
- Updated the Header component to v2.4.2 and Footer component to v0.4.1.

### v0.2.6
#### Updated
- Updated the Header component to v2.4.0.

### v0.2.5
#### Updated
- Updated the Header component to v2.3.0 -- Integrating Fundraising Banner.

### v0.2.4
#### Updated
- Updated the parameters for gaUtils.trackPageview() in App.jsx. It removed unnecessary parameters.

### v0.2.3
#### Updated
- Updated the Header version to 2.2.0.
- Updated GA initialization configurations.

### v0.2.2
#### Updated
- Updated the Header version to 2.1.1.

### v0.2.1
#### Updated
- Updated the Header version to 2.1.0.

### v0.2.0
#### Updated
- Updated React to v15 and related npm modules to support the update. Replaced React.PropTypes to PropTypes in components for React v15 conventions.

### v0.1.8
#### Updated
- Updated the entry file `App.jsx` to remove unnecessay import of `babel-polyfill`.

### v0.1.7
#### Updated
- Updated the Header Component to v1.5.5. The updates include integrating the log in related functions with login server, removing console loggings for patron token expiration, and turning off the feature flag of OAuth Login and set it as default.

### v0.1.6
#### Updated
- Updated the Header Component to v1.5.1. The update includes HTTPS fix and the JavaScript fallback for the log in button on the Header Component.

### v0.1.5
#### Added
- Enabled Feature Flags plugin on the client-side and added Optimizely script in the index.ejs file.
