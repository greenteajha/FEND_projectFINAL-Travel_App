// Start Node.js server
const app = require('./server.js')

const listeningPort = 8081

app.listen(listeningPort, ()=>{
    console.log(`Server is listening on port ${listeningPort}`)
})
