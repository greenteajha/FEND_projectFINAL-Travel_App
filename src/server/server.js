// Including all dependencies
// Node-fetch module to provide fetch API capabilities
const fetch = require("node-fetch");

// Module that loads environment variables from a .env file into process.env
const dotenv = require('dotenv');
dotenv.config();

// Creation of API object values
const apiInfo = {
    geoName_URL: "http://api.geonames.org/searchJSON?",
    weatherBit_URL: "https://api.weatherbit.io/v2.0/forecast/daily?",
    pixabay_URL: "https://pixabay.com/api/?",
    weatherBit_API_Key: "b7f28b010148448eb2bcf8df161167f6",
    pixabay_API_Key: "19911908-8e571d0f064087efeb45caed2"
};

// Express to run server and routes
const express = require('express') 
const app = express()

// Use the bodyParser module
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use Cors module
const cors = require('cors');
app.use(cors());

// Use Jest for unit testing
const { TestScheduler } = require('jest');

// Initialize the "dist" folder
app.use(express.static('dist'));

// designates what port the app will listen to for incoming requests
let listeningPort = 8081;
app.listen(listeningPort, function () {
    console.log('Example app listening on port 8081!')
})

// Deliver index.html file main page to web clients
app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

// Use asynchronous function to:
// 1. Receive client request
// 2. Craft API POST request
// 3. Send in API POST request
// 4. Receive API POST response and send it back to the client
app.post('/apirequest', async function(req, res){

    // Take the user input
    const userCityName = req.body.cName
    const userDateDiff = req.body.dateDifference

    // Build API request to GeoNames
    const geoNameRequestURL = encodeURI(`${apiInfo.geoName_URL}name_startsWith=${userCityName}&maxRows=1&username=greenteajha`)
    const geoNameResponse = await fetch (geoNameRequestURL)

    try{

        // Store GeoNames response for later use
        const geoNameData = await geoNameResponse.json()

        if(geoNameData.totalResultsCount == 0){
            
            console.log("No such place!")

            // Store Pixabay response for later use
            const pixabayRequestURL = encodeURI(`${apiInfo.pixabay_URL}key=${apiInfo.pixabay_API_Key}&q=worldmap&image_type=photo`)
            const pixabayResponse = await fetch(pixabayRequestURL)

            try{

                const pixabayData = await pixabayResponse.json()
                const destImgSource = pixabayData.hits[0].webformatURL
                const destMinTemp = 'NIL'
                const destMaxTemp = 'NIL'
            
                // Send response back to the client-side
                const apiResults = {destMinTemp, destMaxTemp, destImgSource}
                res.send(apiResults)

            } catch (Error){
                console.log("ERROR MESSAGE: ", Error)
            }

        }else{
            
            const geoNamesLat = geoNameData.geonames[0].lat
            const geoNamesLon = geoNameData.geonames[0].lng
            const geoNamesCountry = geoNameData.geonames[0].countryName
    
            // Build API request to Weatherbit
            const weatherBitRequestURL = encodeURI(`${apiInfo.weatherBit_URL}lat=${geoNamesLat}&lon=${geoNamesLon}&key=${apiInfo.weatherBit_API_Key}`)
            const weatherBitResponse = await fetch (weatherBitRequestURL)
    
            try{
    
                // Store Weatherbit response for later use
                const weatherBitData = await weatherBitResponse.json()
                let weatherBitTemp = '';
    
                // Checks how many days before the travel start date. If...
                // ... Less than 16 days (Since Weatherbit only fetches a maximum of 16 days forecasted date),
                // .... choose the temperature data of the actual date itself
                // ... 16 days or more, take the 16th day temperature data
                if(userDateDiff < 16){   
                    weatherBitTemp = weatherBitData.data[userDateDiff]    
                }else{    
                    weatherBitTemp = weatherBitData.data[weatherBitData.data.length-1]    
                }

                const destMinTemp = weatherBitTemp.min_temp
                const destMaxTemp = weatherBitTemp.max_temp
                const weatherIconLink = `https://www.weatherbit.io/static/img/icons/${weatherBitTemp.weather.icon}.png`
                const weatherDesc = weatherBitTemp.weather.description

                // Store Pixabay response for later use
                const pixabayRequestURL = encodeURI(`${apiInfo.pixabay_URL}key=${apiInfo.pixabay_API_Key}&q=${geoNamesCountry}&image_type=photo`)
                const pixabayResponse = await fetch(pixabayRequestURL)
    
                try{
    
                    const pixabayData = await pixabayResponse.json()
                    const destImgSource = pixabayData.hits[0].webformatURL
                
                    // Send response back to the client-side
                    const apiResults = {destMinTemp, destMaxTemp, destImgSource, geoNamesCountry, weatherIconLink, weatherDesc}
                    res.send(apiResults)
    
                } catch (Error){
                    console.log("ERROR MESSAGE: ", Error)
                }
    
            } catch (Error){
                console.log("ERROR MESSAGE: ", Error)
            }
        }        
        
    } catch (Error){
        console.log("ERROR MESSAGE: ", Error)
    }

})
