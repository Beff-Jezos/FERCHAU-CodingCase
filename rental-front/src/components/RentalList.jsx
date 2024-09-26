import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RentalList = () => {
  const [rentals, setRentals] = useState([]);

  // Vermietungen beim Laden der Komponente abrufen
  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const response = await axios.get('http://localhost:5000/rentals');
      setRentals(response.data);
    } catch (error) {
      console.error('Fehler beim Laden der Vermietungen:', error);
    }
  };

  return (
    <div>
      <h2>Liste der Vermietungen</h2>
      <table>
        <thead>
          <tr>
            <th>Kunde</th>
            <th>Auto</th>
            <th>Mietbeginn</th>
            <th>Mietende</th>
            <th>Kilometerstand</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr key={rental.id}>
              <td>{rental.customerName}</td>
              <td>{rental.carBrand} {rental.carModel} ({rental.licensePlate})</td>
              <td>{rental.rentalStart}</td>
              <td>{rental.rentalEnd}</td>
              <td>{rental.mileage} km</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RentalList;
