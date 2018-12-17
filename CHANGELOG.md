## Changelog
### v1.0.0
#### Updated
- Note: we'll add all changes here until the deployment around December 18th
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
