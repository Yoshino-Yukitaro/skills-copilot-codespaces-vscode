// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

// Create an express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create an event store
const events = [];

// Create an endpoint to receive events
app.post('/events', (req, res) => {
  const event = req.body;

  // Add event to event store
  events.push(event);

  // Send event to event bus
  axios.post('http://event-bus-srv:4005/events', event);

  res.send({ status: 'OK' });
});

// Create an endpoint to get events
app.get('/events', (req, res) => {
  res.send(events);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on port 4001');
});