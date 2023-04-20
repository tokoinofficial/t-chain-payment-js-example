// Load environment
require('dotenv').config()

const express = require('express');
const cors = require ('cors');

const app = express();
const port = 9090;

// Middlewares
app.use(express.json());
app.use(express.text());
app.use(cors());

const TnxDao = require("./daos/tnx");
const TnxService = require("./services/tnx");
const FirebaseMessagingService = require("./services/fcm")

const tnxDao = new TnxDao("./db.sqlite3");
const tnxSvc = new TnxService(tnxDao);
const fcmSvc = new FirebaseMessagingService()
tnxSvc.createTable();

app.use(express.json());

const registeredTokens = []

app.get('/', (request, response) => {
    console.log(`URL: ${request.url}`);
    response.send('Hello, Server!');
});

// HookURL
// http://localhost:9090/api/web-hook-url
app.post('/api/web-hook-url', (request, response) => {
    const data = request.body;
    console.log("Receive msg from tchain", data);
    tnxSvc.addNewTnx([
        data.tnx_hash,
        data.deposit_address,
        data.deposit_id,
        data.order_id,
        data.amount,
        data.fee,
        data.type,
        data.status,
        data.deposited_at])

    // Send notification to registered devices
    fcmSvc.send(data, { tokens: registeredTokens })

    response.send(request.body);
});

// Notification subscription
app.post('/api/notification/subscribe', (request, response) => {
  const token = request.body;
  if (registeredTokens.indexOf(token) > -1) {
    response.send({status: "Already registered", token})
    return
  }

  console.log("New subscription:", token)
  registeredTokens.push(token)
  fcmSvc.send({status: "Subscribed!"}, { token })
  response.send({status: "Registered", token})
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