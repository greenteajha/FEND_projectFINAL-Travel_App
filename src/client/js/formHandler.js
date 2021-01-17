const fetch = require("node-fetch");

// Function to add a new trip
function addTrip(fUserResult, fStartDate, fTripName, fTripLength, fDateDifference, fDestinationName, fResult){

    let tripSection = document.createElement('div')
    tripSection.setAttribute('class','tripSection')
    tripSection.setAttribute('id', fTripName)
    fUserResult.appendChild(tripSection)

    let tripName = document.createElement('h2')
    tripName.innerHTML = fTripName
    tripSection.appendChild(tripName)

    let removeButton = document.createElement('input')
    removeButton.setAttribute('value', 'Remove')
    removeButton.setAttribute('name', fTripName)
    removeButton.setAttribute('type', 'submit')
    removeButton.addEventListener('click',removeTrip)
    tripSection.appendChild(removeButton)

    let startDate = document.createElement('div')
    startDate.setAttribute('id','startDate')
    if(fTripLength == 0){
        startDate.innerHTML = `Your travel starts on the: ${fStartDate} and will last for the day itself!`

    }else{
        startDate.innerHTML = `Your travel starts on the: ${fStartDate} and will last for ${fTripLength} day(s)!`
    }
    tripSection.appendChild(startDate)

    let countDown = document.createElement('div')
    countDown.setAttribute('id','countDown')
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

    let destName = document.createElement('div')
    destName.setAttribute('class','destName')
    destName.innerHTML = `Your destination is: ${fResult.geoNamesCountry}, ${fDestinationName}`
    destSection.appendChild(destName)


    let minTemp = document.createElement('div')
    minTemp.setAttribute('class','minTemp')
    minTemp.innerHTML = `The minimum temperature is: ${fResult.destMinTemp} degrees celcius`
    destSection.appendChild(minTemp)

    let maxTemp = document.createElement('div')
    maxTemp.setAttribute('class','maxTemp')
    maxTemp.innerHTML = `The maximum temperature is: ${fResult.destMaxTemp} degrees celcius`
    destSection.appendChild(maxTemp)

    let imgPlaceHolder = document.createElement('img')
    imgPlaceHolder.setAttribute('class','imgPlaceHolder')
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
    //userResults.innerHTML = ''

    const cName = document.getElementById('countryName').value
    const uStartDate = new Date(document.getElementById('startDate').value)
    const uEndDate = document.getElementById('endDate').value.toString()
    const tripName = document.getElementById('tripName').value
    const todayDate = new Date()

    console.log(uStartDate)
    console.log(todayDate)

    // Added 0.99 as uStartDate takes the date at 0000 Hrs, which will end up as a negative when choosing the same date
    const dateDifference = Math.floor(Math.abs((Date.parse(uStartDate) - todayDate)/(1000 * 60 * 60 * 24)))
    const tripLength = Math.floor(Math.abs((Date.parse(uEndDate) - Date.parse(uStartDate))/(1000 * 60 * 60 * 24)))

    console.log(dateDifference)

    retrieveResults({cName, startDate, dateDifference})
    .then(
        function(result){

            addTrip(userResults, uStartDate, tripName, tripLength, dateDifference, cName, result)

        }
    )   
}

export { handleSubmit }