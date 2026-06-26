const { sql, getPool } = require('../config/database');



const createIncident = async (req, res) => {
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

    const pool = await getPool();

    const result = await pool.request()
      .input('Title', sql.NVarChar, title)
      .input('Description', sql.NVarChar, description)
      .input('Priority', sql.NVarChar, priority)
      .input('CreatedBy', sql.Int, req.user.id)
      .query(`
        INSERT INTO Incidents
        (
          Title,
          Description,
          Priority,
          Status,
          CreatedBy,
          CreatedAt,
          UpdatedAt
        )

        OUTPUT INSERTED.*

        VALUES
        (
          @Title,
          @Description,
          @Priority,
          'Open',
          @CreatedBy,
          GETDATE(),
          GETDATE()
        )
      `);

    res.status(201).json({
      message: 'Incident created successfully',
      incident: result.recordset[0]
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getAllIncidents = async (req, res) => {
  try {
    const pool = await getPool();

    

    let result;

    // Admin & Support Engineer -> View all incidents
    if (
      req.user.role === 'Admin' ||
      req.user.role === 'Support Engineer'
    ) {

      

      result = await pool.request()
        .query(`
          SELECT *
          FROM Incidents
          ORDER BY CreatedAt DESC
        `);

    } else {

      

      result = await pool.request()
        .input('CreatedBy', sql.Int, req.user.id)
        .query(`
          SELECT *
          FROM Incidents
          WHERE CreatedBy = @CreatedBy
          ORDER BY CreatedAt DESC
        `);

    }

    

    res.status(200).json({
      count: result.recordset.length,
      incidents: result.recordset
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};
const getIncidentById = async (req, res) => {
  try {

    const id = parseInt(req.params.id);

    const pool = await getPool();

    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query(`
        SELECT *
        FROM Incidents
        WHERE Id = @Id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: 'Incident not found'
      });
    }

    const incident = result.recordset[0];

    // RBAC Check
    if (
      req.user.role !== 'Admin' &&
      req.user.role !== 'Support Engineer' &&
      incident.CreatedBy !== req.user.id
    ) {
      return res.status(403).json({
        message: 'Access denied'
      });
    }

    res.status(200).json(incident);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const updateIncident = async (req, res) => {
  try {

    const id = parseInt(req.params.id);

    const {
      title,
      description,
      priority,
      status
    } = req.body;

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

    const pool = await getPool();

    // Check incident exists
    const existingIncident = await pool.request()
      .input('Id', sql.Int, id)
      .query(`
        SELECT *
        FROM Incidents
        WHERE Id = @Id
      `);

    if (existingIncident.recordset.length === 0) {
      return res.status(404).json({
        message: 'Incident not found'
      });
    }

    const incident = existingIncident.recordset[0];

    // RBAC
    if (
      req.user.role !== 'Admin' &&
      req.user.role !== 'Support Engineer' &&
      incident.CreatedBy !== req.user.id
    ) {
      return res.status(403).json({
        message: 'Access denied'
      });
    }

    // Update Incident
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .input(
        'Title',
        sql.NVarChar,
        title ?? incident.Title
      )
      .input(
        'Description',
        sql.NVarChar,
        description ?? incident.Description
      )
      .input(
        'Priority',
        sql.NVarChar,
        priority ?? incident.Priority
      )
      .input(
        'Status',
        sql.NVarChar,
        status ?? incident.Status
      )
      .query(`
        UPDATE Incidents
        SET
          Title = @Title,
          Description = @Description,
          Priority = @Priority,
          Status = @Status,
          UpdatedAt = GETDATE()

        WHERE Id = @Id;

        SELECT *
        FROM Incidents
        WHERE Id = @Id;
      `);

    res.status(200).json({
      message: 'Incident updated successfully',
      incident: result.recordset[0]
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const deleteIncident = async (req, res) => {
  try {

    const id = parseInt(req.params.id);

    const pool = await getPool();

    // Check if incident exists
    const existingIncident = await pool.request()
      .input('Id', sql.Int, id)
      .query(`
        SELECT *
        FROM Incidents
        WHERE Id = @Id
      `);

    if (existingIncident.recordset.length === 0) {
      return res.status(404).json({
        message: 'Incident not found'
      });
    }

    const incident = existingIncident.recordset[0];
    console.log("========== DELETE DEBUG ==========");
console.log("Logged In User:", req.user);
console.log("Incident CreatedBy:", incident.CreatedBy);
console.log("Are they equal?", incident.CreatedBy === req.user.id);

    // RBAC
    if (
      req.user.role !== 'Admin' &&
      req.user.role !== 'Support Engineer' &&
      incident.CreatedBy !== req.user.id
    ) {
      return res.status(403).json({
        message: 'Access denied'
      });
    }

    // Delete incident
    await pool.request()
      .input('Id', sql.Int, id)
      .query(`
        DELETE FROM Incidents
        WHERE Id = @Id
      `);

    res.status(200).json({
      message: 'Incident deleted successfully'
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};



module.exports = {
  createIncident,
  getAllIncidents,
  getIncidentById,
  updateIncident,
  deleteIncident
};