// All master logic incl. Communication between web server and worker, worker spin up and wind down

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const environment = require('dotenv');

// Set environment variables file
if (process.env.NODE_ENV === 'development') {
  environment.config({ path: './env/development.env' });
} else if (process.env.NODE_ENV === 'production') {
  environment.config({ path: '../env/production.env' });
}

// Modules
const masterController = require('./master_controller.js');

// Variables: [TODO] Need to update with correct port number
const port = process.env.MASTER_PORT || 2000;

// Start Express Server
const app = express();
app.set('port', port);

// Middleware
app.use(bodyParser.json());

// Handle POST request from the web server
app.post('/api/master', masterController.handleJobFromWebServer);

// Handle POST request for jobs from the worker
app.post('/api/requestJob', masterController.requestJob);

// Handle completion POST request from the worker
app.post('/api/complete', masterController.complete);

// Server listens at specified port
app.listen(app.get('port'), () => {
  console.log(`Master server listening to port ${app.get('port')}`);
});

if (process.env.NODE_ENV === 'development') {
  // Mock request data
  const request = {};
  request.body = {
    masterName: 'master1',
    scenarioID: 1,
    scenarioName: 'test1',
    id_user: 2,
    spawnsCount: 9,
    targetURL: 'http://localhost:3000',
    script: 'get /',
  };
  // Mock incoming request
  masterController.handleJobFromWebServer(request);
}