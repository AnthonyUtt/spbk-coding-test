import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './reset.css';
import './App.css';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [type, setType] = useState('sedan');
  const [name, setName] = useState('');
  const [mileage, setMileage] = useState(0);
  const [wheels, setWheels] = useState(4);
  const [doors, setDoors] = useState(4);
  const [engine, setEngine] = useState('works');
  const [seat, setSeat] = useState('works');
  const [slidingDoors, setSlidingDoors] = useState([false,false,false,false]);

  const [editing, setEditing] = useState(false);
  const [id, setId] = useState(-1);
  const [regId, setRegId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    updateList();
  }, []);
  
  const updateList = () => {
    console.log('Updating list!');
    axios.get('http://localhost:3001/vehicles')
      .then(res => { console.log(res.data); setVehicles(res.data); })
      .catch(err => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      type,
      nickname: name,
      mileage,
      wheels,
      doors,
      engine,
    };

    if (id > -1) data.id = id;
    if (regId !== '') data.regId = regId;
    if (type === 'motorcycle') data.seat = seat;
    if (type === 'minivan') data.slidingDoors = slidingDoors;

    const json = JSON.stringify(data);
    if (id > -1) {
      axios.put(`http://localhost:3001/vehicles/${id}`, json, { headers: { 'Content-Type': 'application/json' } })
        .then(updateList())
        .then(resetForm())
        .catch(err => setErrorMessage(err.response.data));
    } else {
      axios.post(`http://localhost:3001/vehicles`, json, { headers: { 'Content-Type': 'application/json' } })
        .then(res => { console.log(res); return res; })
        .then(updateList())
        .then(resetForm())
        .catch(err => setErrorMessage(err.response.data));
    }
  };

  const resetForm = () => {
    setType('sedan');
    setName('');
    setMileage(0);
    setWheels(4);
    setDoors(4);
    setEngine('works');
    setSeat('works');
    setSlidingDoors([false, false, false, false]);
    setEditing(false);
    setId(-1);
    setRegId('');
  };

  const populateFields = (vehicle) => {
    setType(vehicle.type);
    setName(vehicle.nickname);
    setMileage(vehicle.mileage);
    setWheels(vehicle.wheels);
    setDoors(vehicle.doors);
    setEngine(vehicle.engine);
    setId(vehicle.id);
    setRegId(vehicle.regId);
    if (vehicle.type === 'motorcycle') setSeat(vehicle.seat);
    if (vehicle.type === 'minivan') setSlidingDoors(vehicle.slidingDoors);

    setEditing(true);
  };

  const resizeDoors = (size) => {
    setSlidingDoors(prev => {
      var tmpArr = [];
      for(var i = 0; i < size; i++) {
        if (prev[i]) {
          tmpArr.push(true);
        } else {
          tmpArr.push(false);
        }
      }
      return tmpArr;
    });
  };

  const prettyType = (type) => {
    switch (type) {
      case 'sedan':
        return 'Sedan';
      case 'coupe':
        return 'Coupe';
      case 'minivan':
        return 'Mini-Van';
      case 'motorcycle':
        return 'Motorcycle';
      default:
        return '';
    }
  };

  const deleteVehicle = () => {
    if (id > -1) {
      axios.delete(`http://localhost:3001/vehicles/${id}`)
        .then(removeFromList(id))
        .then(resetForm())
        .catch(err => console.error(err));
    }
  };

  const removeFromList = (id) => {
    setVehicles(prev => {
      var toRemove = -1;
      for (var i = 0; i < prev.length; i++) {
        if (prev[i].id === id) {
          toRemove = i;
        }
      }
      if (toRemove >= 0) {
        prev.splice(toRemove, 1);
      }
      return [...prev];
    });
  };

  return (
    <div className="App">
      <h1>Junk Tracker 3000</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="type">Type:</label>
          <select name="type" value={type} onChange={e => setType(e.target.value)}>
            <option value="sedan">Sedan</option>
            <option value="coupe">Coupe</option>
            <option value="minivan">Mini-Van</option>
            <option value="motorcycle">Motorcycle</option>
          </select>
        </div>
        <div>
          <label htmlFor="name">Nickname:</label>
          <input name="name" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="mileage">Mileage:</label>
          <input name="mileage" value={mileage} onChange={e => setMileage(e.target.value)} type="number" min={0} />
        </div>
        <div>
          <label htmlFor="wheels">Wheels:</label>
          <input name="wheels" value={wheels} onChange={e => setWheels(e.target.value)} type="number" min={0} />
        </div>
        <div className="doors">
          <div className="main-doors">
            <label htmlFor="doors">Doors:</label>
            <input name="doors" value={doors} onChange={e => setDoors(() => { resizeDoors(e.target.value); return e.target.value; })} type="number" min={0} />
          </div>
          {
            type === 'minivan' &&
            <div className="sliding-doors">
              <p>Sliding Doors?</p>
              <div>
                {
                  slidingDoors.map((val, idx) => (
                    <div className="door" key={`door-${idx}`}>
                      <label htmlFor={`door-${idx}`}>Door {idx + 1}</label>
                      <input type="checkbox" checked={val} onChange={e => setSlidingDoors(prev => { prev[idx] = e.target.checked; return [...prev]; })} />
                    </div>
                  ))
                }
              </div>
            </div>
          }
        </div>
        <div>
          <label htmlFor="engine">Engine:</label>
          <select name="engine" value={engine} onChange={e => setEngine(e.target.value)}>
            <option value="works">Works</option>
            <option value="fixable">Fixable</option>
            <option value="junk">Junk</option>
          </select>
        </div>
        {
          type === 'motorcycle' &&
          <div>
            <label htmlFor="seat">Seat:</label>
            <select name="seat" value={seat} onChange={e => setSeat(e.target.value)}>
              <option value="works">Works</option>
              <option value="fixable">Fixable</option>
              <option value="junk">Junk</option>
            </select>
          </div>
        }
        <div className="button-container">
          <button type="submit">{editing ? 'Update' : 'Submit'}</button>
          {editing && <button type="button" onClick={resetForm}>Clear Selection</button>}
          {editing && <button className="destructive" type="button" onClick={deleteVehicle}>Delete</button>}
        </div>
        <p>{errorMessage}</p>
      </form>
      <h2>Current Inventory</h2>
      <ul>
        {
          vehicles.map((val, idx) => (
            <li key={`vehicle-${idx}`} onClick={() => populateFields(val)}>
              <div className="vehicle">
                <h3>{val.nickname}</h3>
                <p>Type: {prettyType(val.type)}</p>
                <p>Mileage Rating: { val.mileage < 10000 ? 'Low' : val.mileage < 100000 ? 'Medium' : 'High' }</p>
                <p>Registration ID: {val.regId}</p>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
