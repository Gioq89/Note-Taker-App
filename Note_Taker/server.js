const express = require('express');
const path = require('path');
const fs = require('fs');
const dataBase = require('./db/db.json');

const PORT = process.env.port || 3001;

const app = express();


//HTML routes 
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Note taker listening at http://localhost:${PORT}`);
  });

  // Read the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to read notes data.' });
      }
  
      const notes = JSON.parse(data);
      res.json(notes);
    });
  });