# Travel Application

This is a web travel application that allows user to request for information based on the country that they request:
- Temperature
- Days till trip start
- Weather conditions

## Getting Started

In order to access the web application, perform the following steps:

1. Clone the repository to your local drive
2. Use `cd` to change directory to the project root folder
3. Issue the command `npm install` to download all the necessary dependent modules
4. Build the production bundle using the command `npm run build-prod`. This will produce a bundled dist folder with all the bundled minified files.
5. Access the webpage on your localhost at [http://localhost:8081](http://localhost:8081)

## Running Test

To perform unit testing with Jest, run the command `npm test`.

I've indicated 1 test:

1. Test if the client submission to the backend server works

## Project Extension

The following extra features have been added:

- Add end date and display length of trip.
- Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities).
- Allow the user to add hotel and/or flight data.
    - Multiple places to stay? Multiple flights?
- Allow the user to remove the trip.
- Incorporate icons into forecast.
- Allow user to Print their trip and/or export to PDF.
- Allow the user to add additional trips (this may take some heavy reworking, but is worth the challenge).

## Authors

- Jeremy Teo