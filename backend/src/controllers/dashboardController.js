const { sql, getPool } = require("../config/database");

const getDashboardStats = async (req, res) => {
  try {

    const pool = await getPool();

    const result = await pool.request().query(`
      SELECT
        COUNT(*) AS TotalIncidents,

        SUM(
          CASE
            WHEN Status='Open'
            THEN 1
            ELSE 0
          END
        ) AS OpenIncidents,

        SUM(
          CASE
            WHEN Status='In Progress'
            THEN 1
            ELSE 0
          END
        ) AS InProgressIncidents,

        SUM(
          CASE
            WHEN Status='Resolved'
            THEN 1
            ELSE 0
          END
        ) AS ResolvedIncidents

      FROM Incidents
    `);

    const stats = result.recordset[0];

    res.status(200).json(stats);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  getDashboardStats
};