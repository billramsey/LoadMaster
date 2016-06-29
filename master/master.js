// All master logic incl. Communication between web server and worker, worker spin up and wind down

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const environment = require('dotenv');

// Set environment variables file
if (process.env.NODE_ENV === 'development') {
  environment.config({ path: './env/development.env' });
} else if (process.env.NODE_ENV === 'production') {
  environment.config({ path: './env/production.env' });
}

// Modules
const masterController = require('./master_controller.js');

// Variables: [TODO] Need to update with correct port number
const port = process.env.PORT || 2000;

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

const webserverUrl = process.env.PROTOCOL + process.env.WEB_PORT_8000_TCP_ADDR + ':' + process.env.WEB_PORT + '/api/scenarios';
console.log('webserverUrl', webserverUrl);

request.get(webserverUrl, (error, response, body) => {
  if (error) {
    console.log(error);
  }
  console.log('body', body);
  console.log('response', response);
});
