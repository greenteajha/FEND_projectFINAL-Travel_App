// Including all dependencies
const fetch = require("node-fetch");

// Module that loads environment variables from a .env file into process.env
const dotenv = require('dotenv');
dotenv.config();

// Express to run server and routes
const express = require('express') 
const app = express()

// Creation of API object
var textapi = {
    application_URL: "http://api.geonames.org/searchJSON?"
};

let listeningPort = 8081;

// Add body-parser dependencies
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use Cors
const cors = require('cors');
const { TestScheduler } = require('jest');
app.use(cors());

// Initialize the "dist" folder
app.use(express.static('dist'));

// designates what port the app will listen to for incoming requests
app.listen(listeningPort, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

// Use asynchronous function to:
// 1. Receive client request
// 2. Craft API POST request
// 3. Send in API POST request
// 4. Receive API POST response and send it back to the client
app.post('/apirequest', async function(req, res){

    //console.log(req.body.cName)
    const userCityName = req.body.cName
    const geonameRequestURL = encodeURI(textapi.application_URL+"q="+userCityName+"&maxRows=1&username=greenteajha")


    console.log(geonameRequestURL)
    // Submit API POST and wait for response
    const response = await fetch (geonameRequestURL)

    let analysisResult = {}

    try{

        // Store response into an object to send back to the client-side
        const data = await response.json()

        console.log(`Longitude: ${data.geonames[0].lng}`)
        console.log(`Latitude: ${data.geonames[0].lat}`)
        console.log(`Country Name: ${data.geonames[0].countryName}`)
            
        // Send response back to the client-side
        res.send(analysisResult)
        
    } catch (Error){
        console.log("ERROR MESSAGE: ", Error)
    }

})
