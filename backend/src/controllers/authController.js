const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sql, getPool } = require('../config/database');

// ===========================
// REGISTER USER
// ===========================
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const pool = await getPool();

    // Check if user already exists
    const result = await pool.request()
      .input('Email', sql.NVarChar, email)
      .query(`
        SELECT *
        FROM Users
        WHERE Email = @Email
      `);

    if (result.recordset.length > 0) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const insertResult = await pool.request()
      .input('Name', sql.NVarChar, name)
      .input('Email', sql.NVarChar, email)
      .input('Password', sql.NVarChar, hashedPassword)
      .input('Role', sql.NVarChar, role)
      .query(`
        INSERT INTO Users
        (Name, Email, Password, Role)

        OUTPUT
          INSERTED.Id,
          INSERTED.Name,
          INSERTED.Email,
          INSERTED.Role

        VALUES
        (@Name, @Email, @Password, @Role)
      `);

    res.status(201).json({
      message: 'User registered successfully',
      user: insertResult.recordset[0]
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// ===========================
// LOGIN USER
// ===========================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const pool = await getPool();

    // Find user
    const result = await pool.request()
      .input('Email', sql.NVarChar, email)
      .query(`
        SELECT *
        FROM Users
        WHERE Email = @Email
      `);

    const user = result.recordset[0];

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.Password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.Id,
        email: user.Email,
        role: user.Role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    );

    res.status(200).json({
      message: 'Login successful',
      token
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// ===========================
// GET PROFILE
// ===========================
const getProfile = async (req, res) => {
  try {
    const pool = await getPool();

    const result = await pool.request()
      .input('Id', sql.Int, req.user.id)
      .query(`
        SELECT
          Id,
          Name,
          Email,
          Role
        FROM Users
        WHERE Id = @Id
      `);

    const user = result.recordset[0];

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.status(200).json({
      message: 'Profile fetched successfully',
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile
};