const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Verbindung zur SQLite-Datenbank
const db = new sqlite3.Database(path.resolve(__dirname, 'autoverleih.db'), (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Tabellen erstellen, wenn sie nicht existieren
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    licensePlate TEXT NOT NULL,
    mileage INTEGER NOT NULL,
    status TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS rentals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customerId INTEGER NOT NULL,
    carId INTEGER NOT NULL,
    rentalStart TEXT NOT NULL,  -- Ändere 'rentDate' zu 'rentalStart'
    rentalEnd TEXT,             -- Ändere 'returnDate' zu 'rentalEnd'
    mileage INTEGER NOT NULL,   -- Zusammenführen von 'startMileage' und 'endMileage'
    FOREIGN KEY (customerId) REFERENCES customers(id),
    FOREIGN KEY (carId) REFERENCES cars(id)
  )`);

    // Beispiel Einträge 
    // + sicherstellen das diese nur einmal hinzugefügt werden
    
    db.get('SELECT COUNT(*) AS count FROM Cars', (err, row) => {
        if (err) {
          console.error(err.message);
          return;
        }
    
        if (row.count === 0) {

            db.run(`INSERT INTO Cars (brand, model, year, licensePlate, mileage, status) VALUES
                ('Volkswagen', 'Golf', 2018, 'ABC-123', 55000, 'available'),
                ('BMW', '3 Series', 2020, 'DEF-456', 30000, 'available'),
                ('Mercedes-Benz', 'C-Class', 2019, 'GHI-789', 40000, 'rented'),
                ('Toyota', 'Corolla', 2017, 'JKL-101', 70000, 'available'),
                ('Audi', 'A4', 2021, 'MNO-202', 15000, 'rented')`, (err) => {
                if (err) {
                    return console.error('Fehler beim Einfügen:', err.message);
                }
                console.log('Beispiel-Daten erfolgreich hinzugefügt!');
                });
        }
    });

  
});



module.exports = db;
