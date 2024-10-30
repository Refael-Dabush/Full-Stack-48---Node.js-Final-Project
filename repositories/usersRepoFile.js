const jf = require('jsonfile');

const FILE = 'data/usersActions.json';

const getUsersActions = () => {
  return jf.readFile(FILE);
};

const setUserActions = (userAction) => {
  jf.writeFile(FILE, userAction);
};

module.exports = {
  getUsersActions,
  setUserActions,
};
