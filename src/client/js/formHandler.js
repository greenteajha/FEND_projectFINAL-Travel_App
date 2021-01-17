const fetch = require("node-fetch");


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
    userResults.innerHTML = ''

    const cName = document.getElementById('countryName').value;
    const uStartDate = document.getElementById('startDate').value;
    const uEndDate = document.getElementById('endDate').value;

    console.log(cName)
    console.log(uStartDate)

    const todayDate = new Date()

    console.log(todayDate)

    const dateDifference = Math.round((Date.parse(uStartDate) - todayDate)/(1000 * 60 * 60 * 24))
    const tripLength = Math.round((Date.parse(uEndDate) - Date.parse(uStartDate))/(1000 * 60 * 60 * 24))

    console.log(dateDifference)

    retrieveResults({cName, startDate, dateDifference})
    .then(
        function(result){
            console.log(result)

            let startDate = document.createElement('div')
            startDate.setAttribute('id','startDate')
            startDate.innerHTML = `Your travel starts on the: ${uStartDate} and will last for ${tripLength} days!`
            userResults.appendChild(startDate)

            let countDown = document.createElement('div')
            countDown.setAttribute('id','countDown')
            countDown.innerHTML = `${dateDifference} days till departure date!`
            userResults.appendChild(countDown)

            let minTemp = document.createElement('div')
            minTemp.setAttribute('id','minTemp')
            minTemp.innerHTML = `The minimum temperature is: ${result.destMinTemp} degrees celcius`
            userResults.appendChild(minTemp)

            let maxTemp = document.createElement('div')
            maxTemp.setAttribute('id','maxTemp')
            maxTemp.innerHTML = `The maximum temperature is: ${result.destMaxTemp} degrees celcius`
            userResults.appendChild(maxTemp)

            let imgPlaceHolder = document.createElement('img')
            imgPlaceHolder.setAttribute('id','imgPlaceHolder')
            imgPlaceHolder.setAttribute('src', result.destImgSource)
            userResults.appendChild(imgPlaceHolder)

        }
    )

    


    
}

export { handleSubmit }