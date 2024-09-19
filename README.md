## Movie Search Application
## Overview
The Movie Search Application is a React-based web app that enables users to search for movies by title and view search results. The application uses Redux for state management, employs regex for input validation, and integrates with an external API to fetch movie data. It also provides user feedback with error messages when invalid input is detected.

## Features
Search Movies: Users can search for movies by title.
Dynamic Results: Results are displayed dynamically as the user types.
Pagination: Automatically loads more results as the user scrolls down.
Input Validation: Validates search input using regex to ensure it contains only alphanumeric characters and a limited number of special characters.
Error Handling: Displays error messages if the input is invalid.
## Technologies Used
React: Frontend framework for building the user interface.
Redux: State management library to handle application state.
Axios: Library for making HTTP requests to fetch movie data.
React Router: Library for handling routing and navigation.
CSS: Styling for the application.
Regex: Used for validating movie title inputs.
## Getting Started
Clone the Repository

bash
Copy code
### `git clone <repository-url>`
### `cd <repository-folder>`
Install Dependencies

bash
Copy code
### `npm install`
Run the Application

bash
Copy code
### `npm start`
The app will be available at http://localhost:3000.

## Components
Header: Contains the search input field and navigation links.

Input Validation: Ensures that the search input meets the regex criteria before allowing the form to submit.
SearchPage: Displays the search results based on user input.

Pagination: Fetches additional results as the user scrolls to the bottom of the page.
## State Management
Redux: Used to manage and centralize the state of the application. This includes storing search results and handling application state transitions.
Input Validation
Regex Validation: Ensures that the search input conforms to the expected format. The regex pattern /^[a-zA-Z0-9\s,'-]{1,100}$/ allows alphanumeric characters, spaces, commas, apostrophes, and hyphens, with a maximum length of 100 characters.
## Error Handling
Error Messages: If the input does not match the regex pattern, an error message is displayed to guide the user to correct their input.

License
This project is licensed under the MIT License. See the LICENSE file for details.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
