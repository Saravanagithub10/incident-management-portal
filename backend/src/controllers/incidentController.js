const incidents = [];

const createIncident = (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const incident = {
      id: incidents.length + 1,
      title,
      description,
      priority,
      status: 'Open',
      createdBy: req.user.email,
      createdAt: new Date()
    };

    incidents.push(incident);

    res.status(201).json({
      message: 'Incident created successfully',
      incident
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getAllIncidents = (req, res) => {
  res.status(200).json({
    count: incidents.length,
    incidents
  });
};
const getIncidentById = (req, res) => {
  console.log("========== DEBUG ==========");
  console.log("PARAM ID:", req.params.id);
  console.log("TYPE:", typeof req.params.id);
  console.log("INCIDENTS ARRAY:", incidents);

  const id = parseInt(req.params.id);

  console.log("PARSED ID:", id);

  const incident = incidents.find(
    incident => incident.id === id
  );

  console.log("FOUND INCIDENT:", incident);

  if (!incident) {
    return res.status(404).json({
      message: 'Incident not found'
    });
  }

  res.status(200).json(incident);
};

const updateIncident = (req, res) => {
  const id = parseInt(req.params.id);

  const incident = incidents.find(
    incident => incident.id === id
  );

  if (!incident) {
    return res.status(404).json({
      message: 'Incident not found'
    });
  }

  const { title, description, priority, status } = req.body;

  incident.title = title || incident.title;
  incident.description = description || incident.description;
  incident.priority = priority || incident.priority;
  incident.status = status || incident.status;

  res.status(200).json({
    message: 'Incident updated successfully',
    incident
  });
};

const deleteIncident = (req, res) => {
  const id = parseInt(req.params.id);

  const index = incidents.findIndex(
    incident => incident.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: 'Incident not found'
    });
  }

  incidents.splice(index, 1);

  res.status(200).json({
    message: 'Incident deleted successfully'
  });
};



module.exports = {
  createIncident,
  getAllIncidents,
  getIncidentById,
  updateIncident,
  deleteIncident
};