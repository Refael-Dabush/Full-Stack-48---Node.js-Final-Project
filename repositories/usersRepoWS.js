const axios = require('axios');

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const getUserByNameAndEmail = (filter) => {
  return axios.get(USERS_URL+filter);
};

module.exports = { getUserByNameAndEmail };