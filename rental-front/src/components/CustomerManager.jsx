import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CustomerManager.css'; 

const CustomerManager = (props) => {
  const [customers, setCustomers] = useState([]);
  const [editCustomerId, setEditCustomerId] = useState(null);
  const [editCustomerData, setEditCustomerData] = useState({ firstName: '', lastName: '', address: '', phone: '', email: '' }); // ### TODO Format an db table Format anpassen! (erledigt. Daten ändern klappt jetzt!)

  // Kundenliste laden
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Fehler beim Laden der Kunden:', error);
    }
  };

  // Kunde löschen
  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/customers/${id}`);
      fetchCustomers(); // Kundenliste nach Löschung neu laden
    } catch (error) {
      console.error('Fehler beim Löschen des Kunden:', error);
    }
  };

  // Kunde bearbeiten
  const editCustomer = (customer) => {
    setEditCustomerId(customer.id);
    setEditCustomerData({ firstName: customer.firstName, lastName: customer.lastName, address: customer.address, phone: customer.phone, email: customer.email });
  };

  // Änderungen speichern
  const saveCustomer = async () => {
    try {
      await axios.put(`http://localhost:5000/customers/${editCustomerId}`, editCustomerData);
      setEditCustomerId(null);
      fetchCustomers(); // Liste nach dem Speichern neu laden
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Kunden:', error);
    }
  };

  // Bearbeitete Daten ändern
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if(props.customerManageActive){
    return (
        <div className="customer-manager">
        <h2>Kundenverwaltung</h2>
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Telefon</th>
                <th>Aktionen</th>
            </tr>
            </thead>
            <tbody>
            {customers.map((customer) => (
                <tr key={customer.id}>
                <td>{editCustomerId === customer.id ? (
                    <input 
                    type="text" 
                    name="name" 
                    value={editCustomerData.firstName} 
                    onChange={handleInputChange} 
                    />
                ) : (
                    customer.firstName
                )}</td>
                <td>{editCustomerId === customer.id ? (
                    <input 
                    type="email" 
                    name="email" 
                    value={editCustomerData.email} 
                    onChange={handleInputChange} 
                    />
                ) : (
                    customer.email
                )}</td>
                <td>{editCustomerId === customer.id ? (
                    <input 
                    type="tel" 
                    name="phone" 
                    value={editCustomerData.phone} 
                    onChange={handleInputChange} 
                    />
                ) : (
                    customer.phone
                )}</td>
                <td>
                    {editCustomerId === customer.id ? (
                    <button onClick={saveCustomer}>Speichern</button>
                    ) : (
                    <>
                        <button onClick={() => editCustomer(customer)}>Bearbeiten</button>
                        <button onClick={() => deleteCustomer(customer.id)}>Löschen</button>
                    </>
                    )}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
    };
  }

export default CustomerManager;
