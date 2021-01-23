//import { app } from '../src/server/server'
const app = require('../src/server/server')
const supertest = require('supertest')
const request = supertest(app)

describe ('API ENDPOINT TEST', () => {
    it('Check to see if the API endpoint is able to return the index.html page', async done => {
        const response = await request.get('/')
        expect(response.status).toBe(200)
        done()
    })
})