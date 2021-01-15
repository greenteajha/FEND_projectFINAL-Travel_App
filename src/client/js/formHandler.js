const fetch = require("node-fetch");



// Function to execute when the user clicks on the submit button
function handleSubmit(event) {
    event.preventDefault()

    const cName = document.getElementById('countryName').value;
    const depDate = document.getElementById('depDate').value;

    console.log(cName)
    console.log(depDate)

    // Retrieve user's input
    //const submittedURL = document.getElementById('url').value;

}

export { handleSubmit }