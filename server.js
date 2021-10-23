const express = require('express');
const path = require('path');
const app = express();
var cors = require('cors');

const database = require('./lib/database');

app.use(cors()); // Don't do this in production :)

app.use(express.static(path.join(__dirname, 'build'))); // Serves build production files
app.use(express.json());

app.get('/vehicles', (req, res) => {
  // TODO
  res.json([]);
});

app.get('/vehicles/:id', (req, res) => {
  // TODO
  res.json({});
});

app.post('/vehicles', (req, res) => {
  // TODO
  res.json({});
});

app.put('/vehicles/:id', (req, res) => {
  // TODO
  res.json({});
});

app.delete('/vehicles/:id', (req, res) => {
  // TODO
  res.json({});
});

// Serves build production files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3001, () => {
  console.log('Server is now listening on port 3001');
});