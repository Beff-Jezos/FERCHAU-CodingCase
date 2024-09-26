import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

// Components
import CustomerList from './components/CustomerList';
import CarList from './components/CarList';
import CustomerForm from './components/CustomerForm';
import CustomerManager from './components/CustomerManager';
import CarManager from './components/CarManager';
import RentalForm from './components/RentalForm';
import RentalList from './components/RentalList';


// Styles
import './App.css';



function App() {

// UseState für dynamischen Zustand 
const [customerAddActive, setCustomerAddActive] = useState(false);
const [customerManageActive, setCustomerManageActive] = useState(false);
const [carManagerActive, setCarManagerActive] = useState(false);
const [rentalFormActive, setRentalFormActive] = useState(false);




// Farbe für aktive Buttons
const [isClicked, setIsClicked] = useState(false);
const [isClicked2, setIsClicked2] = useState(false);
const [isClicked3, setIsClicked3] = useState(false);
const [isClicked4, setIsClicked4] = useState(false);




// Handle-Funktionen um Component ein oder auszublenden
const handleClick1 = () => {
  setCustomerAddActive(!customerAddActive);
  setIsClicked(!isClicked);

};
const handleClick2 = () => {
  setCustomerManageActive(!customerManageActive);
  setIsClicked2(!isClicked2);
};
const handleClick3 = () => {
  setCarManagerActive(!carManagerActive);
  setIsClicked3(!isClicked3);
};
const handleClick4 = () => {
  setRentalFormActive(!rentalFormActive);
  setIsClicked4(!isClicked4);
};


  return (
//   /*Wenn auf den Button aus Main-Buttons geklickt wird, soll die entsprechendede React Component gerendert werden! props setzen */
//    clickOnBUtton handle Event UseState auf true setzen

    <Router className="App">
      <Routes>
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/rentals" element={<RentalList />} />

      </Routes>

      <div className="App-header">

        <h1>Autoverleih App </h1>

        <div className='Main-Buttons'>
 
          <button style={ {backgroundColor: isClicked ? "#be0000" : "lightgrey  "} }
            onClick={handleClick1}> Neukunden hinzufügen
          </button>
          <button style={ {backgroundColor: isClicked2 ? "#be0000" : "lightgrey  "} } onClick={handleClick2}> Kunden verwalten </button>
          <button style={ {backgroundColor: isClicked3 ? "#be0000" : "lightgrey  "} } onClick={handleClick3}> Autos verwalten </button>
          <button style={ {backgroundColor: isClicked4 ? "#be0000" : "lightgrey  "} } onClick={handleClick4}> Vermietungsstatus </button>
        </div>

        
        <div className='Container'>
           <CustomerForm customerAddActive={customerAddActive}/>
           <CustomerManager customerManageActive={customerManageActive}/>  
           <CarManager carManagerActive={carManagerActive}/>
           <RentalForm rentalFormActive={rentalFormActive}/>
        </div>

      </div>
    </Router>


  );
}

export default App;
