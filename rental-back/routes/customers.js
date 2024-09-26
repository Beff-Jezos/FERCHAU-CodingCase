const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Kunde erstellen
router.post('/', (req, res) => {
  const { firstName, lastName, address, phone, email } = req.body;
  const sql = `INSERT INTO customers (firstName, lastName, address, phone, email) VALUES (?, ?, ?, ?, ?)`;

  db.run(sql, [firstName, lastName, address, phone, email], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

// Alle Kunden abrufen
router.get('/', (req, res) => {
  const sql = `SELECT * FROM customers`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Einzelnen Kunden abrufen
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM customers WHERE id = ?`;

  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

// Kunde aktualisieren
router.put('/:id', (req, res) => {
  const { firstName, lastName, address, phone, email } = req.body;
  const { id } = req.params;
  const sql = `UPDATE customers SET firstName = ?, lastName = ?, address = ?, phone = ?, email = ? WHERE id = ?`;

  db.run(sql, [firstName, lastName, address, phone, email, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ updatedID: id });
  });
});

// Kunde löschen
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM customers WHERE id = ?`;

  db.run(sql, id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ deletedID: id });
  });
});

module.exports = router;
