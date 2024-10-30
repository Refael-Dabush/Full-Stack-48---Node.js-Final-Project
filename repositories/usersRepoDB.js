const User = require('../models/userModel');

const getAllUsers = (filters) => {
    return User.find(filters);
  };

  module.exports = {
    getAllUsers
  }