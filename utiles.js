const jwt = require('jsonwebtoken');
const usersRepoFile = require('./repositories/usersRepoFile');
const jf = require('jsonfile');

const checkToken = (req, res) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.status(401).json('No token provided');
    return false;
  }
  const SECRET_KEY = 'some_key';
  let userId;
  const valid = jwt.verify(token, SECRET_KEY, async (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Failed to authenticate token' });
      return false;
    }
    userId = data.id;
    const validAction = await updateUserAction(data.id);
    if (!validAction) {
      res.status(400).json({ message: 'No action left for today! you logout' });
      return false;
    }
    return true;
  });
  return { valid, userId };
};

const updateUserAction = async (userId) => {
  const { actions: usersActions } = await usersRepoFile.getUsersActions();

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const todayFormatted = dd + '/' + mm + '/' + yyyy;

  const userActions = usersActions.filter(
    (ua) => ua.id.toString() === userId.toString() && ua.date === todayFormatted
  );
  const numberOfAction = userActions.length;
  if (
    numberOfAction != 0 &&
    userActions[numberOfAction - 1].actionAllowd - 1 > 0
  ) {
    return true;
  }

  return false;
};

const addAction = async (id) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const todayFormatted = dd + '/' + mm + '/' + yyyy;

  const { actions: usersActions } = await usersRepoFile.getUsersActions();

  const userActions = usersActions.filter(
    (ua) => ua.id.toString() === id.toString() && ua.date === todayFormatted
  );
  const numberOfAction = userActions.length;
  const updateUsersActions = [...usersActions];
  updateUsersActions.push({
    id: id,
    maxActions: userActions[0].maxActions,
    date: todayFormatted,
    actionAllowd: userActions[numberOfAction - 1].actionAllowd - 1,
  });

  jf.writeFile('./data/usersActions.json', { actions: updateUsersActions });
};

module.exports = {
  checkToken,
  addAction,
};
