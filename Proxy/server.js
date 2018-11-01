const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');
const parser = require("body-parser");
const app = express();
const port = 3100;

app.use(parser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));

// Add all API endpoints
app.get('/listingdata', (req, res) => {
  let requestId = req.query.id;
  requestId = requestId.slice(-3) * 1;
  axios.get(`http://3.16.89.66/listingdata?id=${requestId}`)
  .then((results) => res.send(results.data))
  .catch((err) => console.error(err));
})

app.get('/neighborhooddata', (req, res) => {
  let requestId = req.query.id;
  requestId = requestId.slice(-3) * 1;
  axios.get(`http://3.16.89.66/neighborhooddata?id=${requestId}`)
  .then((results) => res.send(results.data))
  .catch((err) => console.error(err));
})

app.get('/landmarkdata', (req, res) => {
  let lat = req.query.listingLat;
  let long = req.query.listingLong;
  axios.get(`http://3.16.89.66/landmarkdata?listingLat=${lat}&listingLong=${long}`)
  .then((results) => res.send(results.data))
  .catch((err) => console.error(err));
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
})

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
