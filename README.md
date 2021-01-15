# Evaluate a News Article with Natural Language Processing

This web application is a sentiment analysis. It attempts to analyze a user-provided URL and extract sentiments off the texts within the page.

## Getting Started

In order to access the web application, perform the following steps:

1. Clone the repository to your local drive
2. Use `cd` to change directory to the project root folder
3. Issue the command `npm install` to download all the necessary dependencies
4. Build the production bundle using the command `npm run build-prod`. This will produce a bundled dist folder with all the bundled minified files.
5. Access the webpage on your localhost at [http://localhost:8081](http://localhost:8081)

## Running Test

To perform unit testing with Jest, run the command `npm test`.

I've indicated 2 tests - One for each Javascript file:

1. Test for user input to be a valid URL
2. Test for user input submission to the backend server to retrieve the analysis result from the API server

## Authors

- Jeremy Teo