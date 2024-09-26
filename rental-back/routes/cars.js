const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Auto erstellen
router.post('/', (req, res) => {
  const { brand, model, year, licensePlate, mileage, status } = req.body;
  const sql = `INSERT INTO cars (brand, model, year, licensePlate, mileage, status) VALUES (?, ?, ?, ?, ?, ?)`;

  db.run(sql, [brand, model, year, licensePlate, mileage, status], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

// Alle Autos abrufen
router.get('/', (req, res) => {
  const sql = `SELECT * FROM cars`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Einzelnes Auto abrufen
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM cars WHERE id = ?`;

  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

// Auto aktualisieren
router.put('/:id', (req, res) => {
  const { brand, model, year, licensePlate, mileage, status } = req.body;
  const { id } = req.params;
  const sql = `UPDATE cars SET brand = ?, model = ?, year = ?, licensePlate = ?, mileage = ?, status = ? WHERE id = ?`;

  db.run(sql, [brand, model, year, licensePlate, mileage, status, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ updatedID: id });
  });
});

// Auto löschen
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM cars WHERE id = ?`;

  db.run(sql, id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ deletedID: id });
  });
});

module.exports = router;
