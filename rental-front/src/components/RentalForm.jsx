import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RentalForm = (props) => {
  const [cars, setCars] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [rentalData, setRentalData] = useState({ // ### TODO: gleiches Spiel wie beim CustomerManager. Format an db-table anpassen! 
    carId: '',
    customerId: '',
    rentalStart: '', 
    rentalEnd: '',
    mileage: ''
  });

  useEffect(() => {
    fetchCars();
    fetchCustomers();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:5000/cars');
      setCars(response.data.filter(car => car.status === 'available'));
    } catch (error) {
      console.error('Fehler beim Laden der Autos:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Fehler beim Laden der Kunden:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRentalData({ ...rentalData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Daten, die gesendet werden:', rentalData);  // Hinzugefügt: Überprüfe die Daten im Frontend

    try {
      await axios.post('http://localhost:5000/rentals', rentalData);
      alert('Vermietung erfolgreich angelegt!');
      setRentalData({
        customerId: '',
        carId: '',
        rentalStart: '', // ### TODO: gleiches Spiel wie beim CustomerManager. Format an db-table anpassen! 
        rentalEnd: '',
        mileage: ''
      });
      fetchCars(); // Aktualisiert die Liste der verfügbaren Autos
    } catch (error) {
      console.error('Fehler beim Anlegen der Vermietung:', error);
    }
  };

 if(props.rentalFormActive){
    return (
        <div>
        
        <form onSubmit={handleSubmit}>
            <h2>Vermietungsstatus anlegen</h2>

            <label>Auto auswählen:</label>
            <select name="carId" value={rentalData.carId} onChange={handleInputChange} required>
            <option value="">Auto auswählen</option>
            {cars.map((car) => (
                <option key={car.id} value={car.id}>
                {car.brand} {car.model} ({car.licensePlate})
                </option>
            ))}
            </select>

            <label>Kunde auswählen:</label>
            <select name="customerId" value={rentalData.customerId} onChange={handleInputChange} required>
            <option value="">Kunde auswählen</option>
            {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                {customer.name} ({customer.email})
                </option>
            ))}
            </select>
            <br></br>
            <label>Mietbeginn:</label>
            <input type="date" name="rentalStart" value={rentalData.rentalStart} onChange={handleInputChange} required />

            <label>Voraussichtliches Mietende:</label>
            <input type="date" name="rentalEnd" value={rentalData.rentalEnd} onChange={handleInputChange} required />

            <label>Aktueller Kilometerstand:</label>
            <input type="number" name="mileage" value={rentalData.mileage} onChange={handleInputChange} required />

            <button type="submit">Vermietung anlegen</button>
        </form>
        </div>
    );
 }
};

export default RentalForm;
