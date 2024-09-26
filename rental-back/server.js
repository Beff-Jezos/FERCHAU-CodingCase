const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Routen importieren
const customerRoutes = require('./routes/customers');
const carRoutes = require('./routes/cars');
const rentalRoutes = require('./routes/rentals');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routen verwenden
app.use('/customers', customerRoutes);
app.use('/cars', carRoutes);
app.use('/rentals', rentalRoutes);

// Server starten
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
