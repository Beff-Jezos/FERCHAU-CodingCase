import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/cars')
      .then(response => setCars(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>Autoliste</h1>
      <ul>
        {cars.map(car => (
          <li key={car.id}>
            ID:{car.id} | {car.brand} {car.model} ({car.year}) | {car.licensePlate} | Kilometerstand:{car.mileage} | [{car.status}]
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
