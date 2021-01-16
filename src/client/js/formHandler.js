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

    let countDown = document.getElementById('results')
    countDown.innerHTML = ''

    const cName = document.getElementById('countryName').value;
    const depDate = document.getElementById('depDate').value;

    console.log(cName)
    console.log(depDate)

    const todayDate = new Date()

    console.log(todayDate)

    const dateDifference = Math.floor((Date.parse(depDate) - todayDate)/(1000 * 60 * 60 * 24))

    console.log(dateDifference)

    retrieveResults({cName, depDate, dateDifference})
    .then(
        function(result){
            console.log(result)

            let countDownValue = document.createElement('div')
            countDownValue.setAttribute('id','countDown')
            countDownValue.innerHTML = `${dateDifference} days till departure date!`
            countDown.appendChild(countDownValue)

            let minTempValue = document.createElement('div')
            minTempValue.setAttribute('id','minTemp')
            minTempValue.innerHTML = `The minimum temperature is ${result.destMinTemp}`
            countDown.appendChild(minTempValue)

            let maxTempValue = document.createElement('div')
            maxTempValue.setAttribute('id','maxTemp')
            maxTempValue.innerHTML = `The maximum temperature is ${result.destMaxTemp}`
            countDown.appendChild(maxTempValue)

            let imgPlaceHolder = document.createElement('img')
            imgPlaceHolder.setAttribute('src', result.destImgSource)
            countDown.appendChild(imgPlaceHolder)

        }
    )

    


    
}

export { handleSubmit }