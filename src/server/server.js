// Including all dependencies
const fetch = require("node-fetch");

// Module that loads environment variables from a .env file into process.env
const dotenv = require('dotenv');
dotenv.config();

// Express to run server and routes
const express = require('express') 
const app = express()

// Creation of API object
const apiInfo = {
    geoName_URL: "http://api.geonames.org/searchJSON?",
    weatherBit_URL: "https://api.weatherbit.io/v2.0/forecast/daily?",
    pixabay_URL: "https://pixabay.com/api/?",
    weatherBit_API_Key: "b7f28b010148448eb2bcf8df161167f6",
    pixabay_API_Key: "19911908-8e571d0f064087efeb45caed2"
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
    const userDateDiff = req.body.dateDifference
    const geoNameRequestURL = encodeURI(`${apiInfo.geoName_URL}name_startsWith=${userCityName}&maxRows=1&username=greenteajha`)


    console.log(geoNameRequestURL)
    // Submit API POST and wait for response
    const geoNameResponse = await fetch (geoNameRequestURL)

    try{

        // Store response into an object to send back to the client-side
        const geoNameData = await geoNameResponse.json()
        
        console.log(geoNameData)

        if(geoNameData.totalResultsCount == 0){
            console.log("No such place!")
        }else{
            
            const geoNamesLat = geoNameData.geonames[0].lat
            const geoNamesLon = geoNameData.geonames[0].lng
            const geoNamesCountry = geoNameData.geonames[0].countryName
    
            const weatherBitRequestURL = encodeURI(`${apiInfo.weatherBit_URL}lat=${geoNamesLat}&lon=${geoNamesLon}&key=${apiInfo.weatherBit_API_Key}`)
    
            console.log(weatherBitRequestURL)
    
            const weatherBitResponse = await fetch (weatherBitRequestURL)
    
            try{
    
                const weatherBitData = await weatherBitResponse.json()
    
                //console.log(weatherBitData)
    
                let weatherBitTemp = '';
    
                if(userDateDiff < 16){
    
                    weatherBitTemp = weatherBitData.data[userDateDiff-1]
    
                }else{
    
                    weatherBitTemp = weatherBitData.data[weatherBitData.data.length-1]
    
                }
    
                const destMinTemp = weatherBitTemp.min_temp
                const destMaxTemp = weatherBitTemp.max_temp
    
                console.log(`Min. Temperature is ${weatherBitTemp.min_temp}`)
                console.log(`Max. Temperature is ${weatherBitTemp.max_temp}`)
    
                const pixabayRequestURL = encodeURI(`${apiInfo.pixabay_URL}key=${apiInfo.pixabay_API_Key}&q=${geoNamesCountry}&image_type=photo`)
    
                console.log(pixabayRequestURL)
    
                const pixabayResponse = await fetch(pixabayRequestURL)
    
                try{
    
                    const pixabayData = await pixabayResponse.json()
    
                    console.log (pixabayData.hits[0].webformatURL)
    
                    const destImgSource = pixabayData.hits[0].webformatURL
                
                    // Send response back to the client-side
    
                    const apiResults = {destMinTemp, destMaxTemp, destImgSource}
    
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
