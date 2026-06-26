const incidents = [];

const createIncident = (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const errors = [];

if (!title || title.trim() === '') {
  errors.push('Title is required');
}

if (!description || description.trim() === '') {
  errors.push('Description is required');
}

const validPriorities = [
  'Low',
  'Medium',
  'High',
  'Critical'
];

if (!validPriorities.includes(priority)) {
  errors.push(
    'Priority must be Low, Medium, High or Critical'
  );
}

if (errors.length > 0) {
  return res.status(400).json({
    message: 'Validation failed',
    errors
  });
}

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
  const errors = [];

const validPriorities = [
  'Low',
  'Medium',
  'High',
  'Critical'
];

const validStatuses = [
  'Open',
  'In Progress',
  'Resolved',
  'Closed'
];

if (
  priority &&
  !validPriorities.includes(priority)
) {
  errors.push(
    'Priority must be Low, Medium, High or Critical'
  );
}

if (
  status &&
  !validStatuses.includes(status)
) {
  errors.push(
    'Status must be Open, In Progress, Resolved or Closed'
  );
}

if (errors.length > 0) {
  return res.status(400).json({
    message: 'Validation failed',
    errors
  });
}

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