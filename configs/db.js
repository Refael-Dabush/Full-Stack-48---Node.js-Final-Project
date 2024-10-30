const mongoose = require('mongoose');

const connectDB = () => {
  // Connect to MongoDB database
  mongoose
    .connect('mongodb+srv://rafa70:RafaExtrem70@extrem7.wdv6a.mongodb.net/factoryDB')
    .then(() => console.log('Connected to factoryDB'))
    .catch((error) => console.log(error));
};

module.exports = connectDB;