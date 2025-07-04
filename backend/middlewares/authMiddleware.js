const jwt = require('jsonwebtoken');
const userModel = require('../models/User');
const blackListTokenModel = require('../models/blacklistToken');

const authenticate = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized: No token' });

  const blacklisted = await blackListTokenModel.findOne({ token });
  if (blacklisted) return res.status(401).json({ message: 'Token is blacklisted' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    req.userId = user._id;
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = { authenticate };
