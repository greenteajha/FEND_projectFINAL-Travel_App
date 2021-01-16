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

    const cName = document.getElementById('countryName').value;
    const depDate = document.getElementById('depDate').value;

    console.log(cName)
    console.log(depDate)

    retrieveResults({cName, depDate})

    

}

export { handleSubmit }