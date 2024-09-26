import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CarManager.css'; // optional für Styling

const CarManager = (props) => {
  const [cars, setCars] = useState([]);
  const [editCarId, setEditCarId] = useState(null);
  const [editCarData, setEditCarData] = useState({
    brand: '',
    model: '',
    year: '',
    licensePlate: '',
    mileage: '',
    status: '',
  });

  // Autos laden
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:5000/cars');
      setCars(response.data);
    } catch (error) {
      console.error('Fehler beim Laden der Autos:', error);
    }
  };

  // Auto löschen
  const deleteCar = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cars/${id}`);
      fetchCars(); // Liste nach Löschung neu laden
    } catch (error) {
      console.error('Fehler beim Löschen des Autos:', error);
    }
  };

  // Auto bearbeiten
  const editCar = (car) => {
    setEditCarId(car.id);
    setEditCarData({
      brand: car.brand,
      model: car.model,
      year: car.year,
      licensePlate: car.licensePlate,
      mileage: car.mileage,
      status: car.status,
    });
  };

  // Änderungen speichern
  const saveCar = async () => {
    try {
      await axios.put(`http://localhost:5000/cars/${editCarId}`, editCarData);
      setEditCarId(null);
      fetchCars(); // Liste nach dem Speichern neu laden
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Autos:', error);
    }
  };

  // Bearbeitete Daten ändern
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    if(props.carManagerActive){
    return (
      <div className="car-manager">
        <h2>Autoverwaltung</h2>
        <table>
          <thead>
            <tr>
              <th>Marke</th>
              <th>Modell</th>
              <th>Baujahr</th>
              <th>Kennzeichen</th>
              <th>Kilometerstand</th>
              <th>Status</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>{editCarId === car.id ? (
                  <input 
                    type="text" 
                    name="brand" 
                    value={editCarData.brand} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  car.brand
                )}</td>
                <td>{editCarId === car.id ? (
                  <input 
                    type="text" 
                    name="model" 
                    value={editCarData.model} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  car.model
                )}</td>
                <td>{editCarId === car.id ? (
                  <input 
                    type="number" 
                    name="year" 
                    value={editCarData.year} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  car.year
                )}</td>
                <td>{editCarId === car.id ? (
                  <input 
                    type="text" 
                    name="licensePlate" 
                    value={editCarData.licensePlate} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  car.licensePlate
                )}</td>
                <td>{editCarId === car.id ? (
                  <input 
                    type="number" 
                    name="mileage" 
                    value={editCarData.mileage} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  car.mileage
                )}</td>
                <td>{editCarId === car.id ? (
                  <select 
                    name="status" 
                    value={editCarData.status} 
                    onChange={handleInputChange}
                  >
                    <option value="available">verfügbar</option>
                    <option value="rented">vermietet</option>
                  </select>
                ) : (
                  car.status
                )}</td>
                <td>
                  {editCarId === car.id ? (
                    <button onClick={saveCar}>Speichern</button>
                  ) : (
                    <>
                      <button onClick={() => editCar(car)}>Bearbeiten</button>
                      <button onClick={() => deleteCar(car.id)}>Löschen</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};


export default CarManager;
