const express = require('express');
const cors = require('cors');
const incidentRoutes = require('./routes/incidentRoutes');

const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Incident Management Portal API Running'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/incidents', incidentRoutes);

module.exports = app;