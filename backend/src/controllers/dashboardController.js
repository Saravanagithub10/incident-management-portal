const { sql, getPool } = require("../config/database");

const getDashboardStats = async (req, res) => {
  console.log("Dashboard API HIT");
console.log(req.user);
  try {

    const pool = await getPool();

    let result;

    // ===========================
    // ADMIN -> See all incidents
    // ===========================

    if (req.user.role === "Admin") {

      result = await pool.request().query(`
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

    }

    // ===========================
    // EMPLOYEE -> Only own incidents
    // ===========================

    else {

      result = await pool.request()

        .input("CreatedBy", sql.Int, req.user.id)

        .query(`
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

          WHERE CreatedBy = @CreatedBy
        `);

    }

    const stats = result.recordset[0];

    res.status(200).json(stats);

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  getDashboardStats
};