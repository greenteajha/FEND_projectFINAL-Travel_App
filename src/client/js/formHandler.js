const fetch = require("node-fetch");

// Print out ALL trip details
function printPage(){

    const originalSection = document.body.innerHTML;
    const printSection = document.getElementById('results').innerHTML;
    document.body.innerHTML = printSection;
    window.print();
    document.body.innerHTML = originalSection;

}

function checkDupTrip(tripN){

    const elementExist = document.getElementById(tripN)
    return elementExist
}

function addHotel(event){

    event.preventDefault()

    const hotelField = event.target.name
    const hotelName = document.getElementById(hotelField).value
    const hotelNHolder = document.getElementById(`${hotelField}-Holder`)

    const hotelH = document.getElementById(`hotelHeader-${hotelName}`)

    if(hotelH == null){

        let hotelHead = document.createElement('h2')
        hotelHead.setAttribute('id',`hotelHeader-${hotelName}`)
        hotelHead.innerHTML = 'Hotel(s)'
        hotelNHolder.appendChild(hotelHead)

    }

    let hotelPlaceHolder = document.createElement('div')
    hotelPlaceHolder.innerHTML = hotelName
    hotelPlaceHolder.setAttribute('class','hotelName')
    hotelNHolder.appendChild(hotelPlaceHolder)

}

function addFlight(event){

    event.preventDefault()

    const flightField = event.target.name
    const flightName = document.getElementById(flightField).value
    const flightNHolder = document.getElementById(`${flightField}-Holder`)

    const flightH = document.getElementById(`flightHeader-${flightField}`)

    if(flightH == null){

        let fieldHead = document.createElement('h2')
        fieldHead.setAttribute('id',`flightHeader-${flightField}`)
        fieldHead.innerHTML = 'Flight(s)'
        flightNHolder.appendChild(fieldHead)

    }

    let fieldPlaceHolder = document.createElement('div')
    fieldPlaceHolder.innerHTML = flightName
    fieldPlaceHolder.setAttribute('class','flightName')
    flightNHolder.appendChild(fieldPlaceHolder)

}

// Function to add a new trip
function addTrip(fUserResult, fStartDate, fTripName, fTripLength, fDateDifference, fDestinationName, fResult){

    let tripSection = document.createElement('div')
    tripSection.setAttribute('class','tripSection')
    tripSection.setAttribute('id', fTripName)
    fUserResult.appendChild(tripSection)

    // Trip Heading
    let tripHeading = document.createElement('div')
    tripHeading.setAttribute('class','tripHeadingContainer')
    tripSection.appendChild(tripHeading)

    // Trip Heading Left column
    let lTripHeading = document.createElement('div')
    lTripHeading.setAttribute('class','lTripHeadingContainer')
    tripHeading.appendChild(lTripHeading)

    // Trip Name
    let tripName = document.createElement('h2')
    tripName.innerHTML = fTripName
    lTripHeading.appendChild(tripName)

    // Destination Name
    let destName = document.createElement('div')
    destName.setAttribute('class','destName')
    destName.setAttribute('id', `destName-${fTripName}`)
    destName.innerHTML = `${fResult.geoNamesCountry}, ${fDestinationName}`
    lTripHeading.appendChild(destName)

    // Trip Heading Right column
    let rTripHeading = document.createElement('div')
    rTripHeading.setAttribute('class','rTripHeadingContainer')
    tripHeading.appendChild(rTripHeading)    

    let hotelHeading = document.createElement('div')
    hotelHeading.setAttribute('class','hotelHeading')
    rTripHeading.appendChild(hotelHeading)    

    // Add hotel details
    let addHotelField = document.createElement('input')
    addHotelField.setAttribute('type', 'text')
    addHotelField.setAttribute('class',`addHotelField`)
    addHotelField.setAttribute('id',`${fTripName}-addHotelField`)
    hotelHeading.appendChild(addHotelField)

    let addHotelButton = document.createElement('button')
    addHotelButton.innerHTML = 'Add Hotel'
    addHotelButton.setAttribute('class', `addHotelFieldButton`)
    addHotelButton.setAttribute('name', `${fTripName}-addHotelField`)
    addHotelButton.addEventListener('click', addHotel)
    hotelHeading.appendChild(addHotelButton)

    let flightHeading = document.createElement('div')
    flightHeading.setAttribute('class','hotelHeading')
    rTripHeading.appendChild(flightHeading)

    // Add flight details
    let addFlightField = document.createElement('input')
    addFlightField.setAttribute('type', 'text')
    addFlightField.setAttribute('class', 'addFlightField')
    addFlightField.setAttribute('id',`${fTripName}-addFlightField`)
    flightHeading.appendChild(addFlightField)

    let addFlightButton = document.createElement('button')
    addFlightButton.innerHTML = 'Add Flight'
    addFlightButton.setAttribute('class', 'addFlightFieldButton')
    addFlightButton.setAttribute('name', `${fTripName}-addFlightField`)
    addFlightButton.addEventListener('click', addFlight)
    flightHeading.appendChild(addFlightButton)

    let removeButton = document.createElement('button')
    removeButton.innerHTML = 'Remove'
    removeButton.setAttribute('name', fTripName)
    removeButton.addEventListener('click',removeTrip)
    tripSection.appendChild(removeButton)
    

    let startDate = document.createElement('div')
    startDate.setAttribute('class','startDate')
    startDate.setAttribute('id',`${fTripName}-startDate`)
    if(fTripLength == 0){
        startDate.innerHTML = `Your travel starts on the: ${fStartDate} and will last for the day itself!`

    }else{
        startDate.innerHTML = `Your travel starts on the: ${fStartDate} and will last for ${fTripLength} day(s)!`
    }
    tripSection.appendChild(startDate)

    let countDown = document.createElement('div')
    countDown.setAttribute('value',fDateDifference)
    countDown.setAttribute('name',fTripName)
    countDown.setAttribute('class','countDown')
    countDown.setAttribute('id',`${fTripName}-countDown`)
    if(fDateDifference == 0){
        countDown.innerHTML = `Today is your departure date!`

    }else{
        countDown.innerHTML = `${fDateDifference} days till departure date!`
    }
    tripSection.appendChild(countDown)

    let destSection = document.createElement('div')
    destSection.setAttribute('id',`${fTripName}-${fDestinationName}`)
    destSection.setAttribute('class', 'destinationSection')
    tripSection.appendChild(destSection)

    let hotelHolder = document.createElement('div')
    hotelHolder.setAttribute('class', 'addHotelField-Holder')
    hotelHolder.setAttribute('id',`${fTripName}-addHotelField-Holder`)
    destSection.appendChild(hotelHolder)

    let flightHolder = document.createElement('div')
    flightHolder.setAttribute('class', 'addFlightField-Holder')
    flightHolder.setAttribute('id',`${fTripName}-addFlightField-Holder`)
    destSection.appendChild(flightHolder)

    let weatherDescription = document.createElement('div')
    weatherDescription.setAttribute('class', 'weatherDesc')
    weatherDescription.setAttribute('id', `${fTripName}-weatherDesc`)
    weatherDescription.innerHTML = `The weather forecast is: ${fResult.weatherDesc}`
    destSection.appendChild(weatherDescription)

    let weatherIcon = document.createElement('img')
    weatherIcon.setAttribute('src',fResult.weatherIconLink)
    weatherIcon.setAttribute('class', 'weatherIcon')
    weatherIcon.setAttribute('id', `${fTripName}-weatherIcon`)
    destSection.appendChild(weatherIcon)

    let minTemp = document.createElement('div')
    minTemp.setAttribute('class','minTemp')
    minTemp.setAttribute('id',`${fTripName}-minTemp`)
    minTemp.innerHTML = `The minimum temperature is: ${fResult.destMinTemp} degrees celcius`
    destSection.appendChild(minTemp)

    let maxTemp = document.createElement('div')
    maxTemp.setAttribute('class','maxTemp')
    maxTemp.setAttribute('id', `${fTripName}-maxTemp`)
    maxTemp.innerHTML = `The maximum temperature is: ${fResult.destMaxTemp} degrees celcius`
    destSection.appendChild(maxTemp)

    let imgPlaceHolder = document.createElement('img')
    imgPlaceHolder.setAttribute('class','imgPlaceHolder')
    imgPlaceHolder.setAttribute('id', `${fTripName}-imgPlaceHolder`)
    imgPlaceHolder.setAttribute('src', fResult.destImgSource)
    destSection.appendChild(imgPlaceHolder)
}

// Function to remove trip
function removeTrip(event){

    event.preventDefault()

    const removeTarget = event.target.name
    document.getElementById(removeTarget).remove()

}

//Asynchronous function to post user sentiment analysis API request to the server-end
const retrieveResults = async (APIRequest) => {

    const res = await fetch(
        'http://localhost:8081/apirequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(APIRequest),
        }
    )

    try{
        const APIResult = await res.json()
        return APIResult
    } catch (Error){
        console.log("ERROR MESSAGE: ", Error)
    }
}

// Function to execute when the user clicks on the submit button
function handleSubmit(event) {

    event.preventDefault()

    let userResults = document.getElementById('results')

    const cName = document.getElementById('countryName').value
    const uStartDate = new Date(document.getElementById('startDate').value)
    const uEndDate = document.getElementById('endDate').value.toString()
    const tripName = document.getElementById('tripName').value
    const todayDate = new Date()

    if(checkDupTrip(tripName) != null){
        
        alert("Trip already exists! Remove the existing trip or enter a different trip name!")

    }else{

        // Added 0.99 as uStartDate takes the date at 0000 Hrs, which will end up as a negative when choosing the same date
        const dateDifference = Math.floor(Math.abs((Date.parse(uStartDate) - todayDate)/(1000 * 60 * 60 * 24)))
        const tripLength = Math.floor(Math.abs((Date.parse(uEndDate) - Date.parse(uStartDate))/(1000 * 60 * 60 * 24)))

        retrieveResults({cName, startDate, dateDifference})
        .then(
            function(result){

                addTrip(userResults, uStartDate, tripName, tripLength, dateDifference, cName, result)
                
            }
        )
    }   
}

export { handleSubmit }
export { printPage }