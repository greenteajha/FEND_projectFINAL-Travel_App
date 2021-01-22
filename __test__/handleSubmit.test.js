// Import retrieveNLPresults from formHandler.js for testing
import { retrieveResults } from "../src/client/js/formHandler"

// Run test to 
describe ('FORM HANDLING TEST', () => {
    test('Check if submission of a valid country name and the date difference to the backend returns an API result', async () => {

        const testData = {
            cName: 'maldives',
            dateDifference: 5
        }

        return retrieveResults(testData).then(data => {
            expect(data.geoNamesCountry).toBe('Maldives');
        })
    })
})