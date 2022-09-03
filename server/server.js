let express = require('express');
let app = express();
let port = 9090;

const TnxDao = require("./daos/tnx");
const TnxService = require("./services/tnx");

const tnxDao = new TnxDao("./db.sqlite3");
const tnxSvc = new TnxService(tnxDao);
tnxSvc.createTable();

app.use(express.json());

app.get('/', (request, response) => {
    console.log(`URL: ${request.url}`);
    response.send('Hello, Server!');
});

app.post('/api/payment', (request, response) => {
    const data = request.body;
    tnxSvc.addNewTnx([
        data.tnx_hash, 
        data.deposit_address, 
        data.deposit_id, 
        data.offchain, 
        data.amount, 
        data.fee, 
        data.type, 
        data.status, 
        data.deposited_at])

    response.send(request.body);
});

app.get('/api/transactions', (request, response) => {
    tnxSvc.getAll().then(res => {
        response.send(res);
    })
});
 
// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
 
    console.log(`Server listening on port ${server.address().port}`);
});