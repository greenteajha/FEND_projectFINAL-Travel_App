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
    application_key: "1e974d78b7c20ecdd2f71f6a542ff5fa",
    application_URL: "https://api.meaningcloud.com/sentiment-2.1"
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

    // Encode client request
    const submittedURL = encodeURI(req.body.submittedURL)
    // Craft API POST request
    const fetchURL = textapi.application_URL+"?key="+textapi.application_key+"&of=json&url="+submittedURL+"&model=general&lang=en"
    // Submit API POST and wait for response
    const response = await fetch (fetchURL)

    let analysisResult = {}

    try{

        // Store response into an object to send back to the client-side
        const data = await response.json()

        analysisResult = {
            resultScoretag: data.score_tag,
            resultAgreement: data.agreement,
            resultSubjectivity: data.subjectivity,
            resultConfidence: data.confidence,
            resultIrony: data.irony,
        }
            
        // Send response back to the client-side
        res.send(analysisResult)
        
    } catch (Error){
        console.log("ERROR MESSAGE: ", Error)
    }

})
