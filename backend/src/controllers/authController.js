const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = [];

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = users.find(
      user => user.email === email
    );

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
      role
    };

    users.push(newUser);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(
      user => user.email === email
    );

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    );
    const getProfile = (req, res) => {
  res.status(200).json({
    message: 'Profile fetched successfully',
    user: req.user
  });
};

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

const getProfile = (req, res) => {
  res.status(200).json({
    message: 'Profile fetched successfully',
    user: req.user
  });
};

module.exports = {
  registerUser,
  loginUser,
  getProfile
};