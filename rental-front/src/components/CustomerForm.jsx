import React, { useState } from 'react';
import axios from 'axios';

const CustomerForm = (props) => {
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Sende eine POST-Anfrage an das Backend, um den Kunden hinzuzufügen
    axios.post('http://localhost:5000/customers', customer)
      .then(response => {
        alert('Kunde erfolgreich hinzugefügt!');
        setCustomer({
          firstName: '',
          lastName: '',
          address: '',
          phone: '',
          email: '',
        }); // Formular nach dem Absenden zurücksetzen
      })
      .catch(error => {
        console.error('Es gab ein Problem beim Hinzufügen des Kunden', error);
      });
  };

  
  if(props.customerAddActive){
    return (
        <form onSubmit={handleSubmit}>
        <h2>Kunden hinzufügen</h2>
        <div>
            <label>Vorname:</label>
            <input
            type="text"
            name="firstName"
            value={customer.firstName}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label>Nachname:</label>
            <input
            type="text"
            name="lastName"
            value={customer.lastName}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label>Adresse:</label>
            <input
            type="text"
            name="address"
            value={customer.address}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label>Telefonnummer:</label>
            <input
            type="text"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label>E-Mail:</label>
            <input
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            required
            />
        </div>
        <button type="submit">Kunden hinzufügen</button>
        </form>
    );
 };
};

export default CustomerForm;
