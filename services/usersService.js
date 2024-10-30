const usersRepoDB = require('../repositories/usersRepoDB');
const usersRepoWS = require('../repositories/usersRepoWS');
const usersRepoFile = require('../repositories/usersRepoFile');

const jf = require('jsonfile');

const getAllUsers = async (filter) => {
  const usersDB = await usersRepoDB.getAllUsers(filter);

  const { actions: usersActions } = await usersRepoFile.getUsersActions();
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const todayFormatted = dd + '/' + mm + '/' + yyyy;

  const users = usersDB.map((uDB) => {

    let userActionToday = uDB.numOfActions;
    const userActions = usersActions.filter(
      (u) => (u.id.toString() === uDB._id.toString() && todayFormatted === u.date)
    );

    if (userActions !== undefined)
      userActionToday = +userActionToday - userActions.length;
    return { ...uDB._doc, ActionToday: userActionToday };
  });

  return users;
};

const getUserLogin = async (filter) => {
  const usersDB = await usersRepoDB.getAllUsers();
  const { data: userWS } = await usersRepoWS.getUserByNameAndEmail(filter);
  const { actions: usersActions } = await usersRepoFile.getUsersActions();

  if (userWS.length > 0) {
    const user = usersDB.filter((u) => u.fullName === userWS[0].name);

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const todayFormatted = dd + '/' + mm + '/' + yyyy;

    const userActions = usersActions.filter(
      (ua) =>
        ua.id.toString() === user[0]._id.toString() &&
        ua.date === todayFormatted
    );
    const numberOfAction = userActions.length;

    if (
      numberOfAction > 0 &&
      userActions[numberOfAction - 1].actionAllowd == 0
    ) {
      return { message: 'You have finished your amount of actions today' };
    }

    if (numberOfAction === 0) {
      usersActions.push({
        id: user[0].id,
        maxActions: user[0].numOfActions,
        date: todayFormatted,
        actionAllowd: user[0].numOfActions,
      });
      jf.writeFile('./data/usersActions.json', { actions: usersActions });
    }

    return user;
  }

  return 'The name or email is incorrect!';
};

module.exports = { getAllUsers, getUserLogin };
