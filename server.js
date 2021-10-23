const express = require('express');
const path = require('path');
const app = express();
var cors = require('cors');

const database = require('./lib/database');
const vrs = require('./lib/vehicleRegistrationService');
const validation = require('./lib/validation');

app.use(cors()); // Don't do this in production :)

app.use(express.static(path.join(__dirname, 'build'))); // Serves build production files
app.use(express.json());

app.get('/vehicles', (req, res) => {
  res.json(database.all());
});

app.get('/vehicles/:id', (req, res) => {
  res.json(database.find(req.params.id));
});

app.post('/vehicles', [validation.validateVehicleData], async (req, res) => {
  var rec = database.create(req.body);
  rec.regId = await vrs.registerVehicle(rec);
  rec = database.update(rec.id, rec);
  res.json(rec);
});

app.put('/vehicles/:id', [validation.validateVehicleData], (req, res) => {
  var rec = database.update(req.params.id, req.body);
  res.json(rec);
});

app.delete('/vehicles/:id', (req, res) => {
  var rec = database.destroy(req.params.id);
  res.json(rec);
});

// Serves build production files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3001, () => {
  console.log('Server is now listening on port 3001');
});