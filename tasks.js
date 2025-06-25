const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM tasks ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

router.post('/add', (req, res) => {
  const { task_name } = req.body;
  db.query('INSERT INTO tasks (task_name, is_completed) VALUES (?, ?)', [task_name, false], (err) => {
    if (err) return res.status(500).json(err);
    res.sendStatus(200);
  });
});

router.put('/complete/:id', (req, res) => {
  const { id } = req.params;
  db.query('UPDATE tasks SET is_completed = true WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.sendStatus(200);
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.sendStatus(200);
  });
});

module.exports = router;
