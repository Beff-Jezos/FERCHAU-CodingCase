const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Vermietung erstellen
router.post('/', (req, res) => {
  const { customerId, carId, rentDate, startMileage } = req.body;
  const sql = `INSERT INTO rentals (customerId, carId, rentDate, startMileage) VALUES (?, ?, ?, ?)`;

  db.run(sql, [customerId, carId, rentDate, startMileage], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

// Alle Vermietungen abrufen
router.get('/', (req, res) => {
  const sql = `SELECT * FROM rentals`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Einzelne Vermietung abrufen
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM rentals WHERE id = ?`;

  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

// Vermietung aktualisieren (Rückgabedatum und Kilometerstand)
router.put('/:id', (req, res) => {
  const { returnDate, endMileage } = req.body;
  const { id } = req.params;
  const sql = `UPDATE rentals SET returnDate = ?, endMileage = ? WHERE id = ?`;

  db.run(sql, [returnDate, endMileage, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ updatedID: id });
  });
});

module.exports = router;
