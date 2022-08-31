let express = require('express');
let app = express();
let port = 9090;

app.use(express.json());

app.get('/', (request, response) => {
    console.log(`URL: ${request.url}`);
    response.send('Hello, Server!');
});

app.post('/api/payment', (request, response) => {
    console.log(request.body)
    response.send(request.body);
});
 
// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
 
    console.log(`Server listening on port ${server.address().port}`);
});