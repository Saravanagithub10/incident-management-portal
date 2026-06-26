const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
  createIncident,
  getAllIncidents,
  getIncidentById,
  updateIncident,
  deleteIncident
} = require('../controllers/incidentController');

router.post('/', authMiddleware, createIncident);

router.get('/', authMiddleware, getAllIncidents);

router.get('/:id', authMiddleware, getIncidentById);

router.put('/:id', authMiddleware, updateIncident);

router.delete('/:id', authMiddleware, deleteIncident);

module.exports = router;