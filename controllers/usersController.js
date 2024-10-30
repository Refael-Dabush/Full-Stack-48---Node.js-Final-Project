const express = require('express');
const usersService = require('../services/usersService');
const jwt = require('jsonwebtoken');

const utils = require('../utiles');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { valid, userId } = await utils.checkToken(req, res);
  if (!valid) return;
  try {
    const filter = req.query;
    const result = await usersService.getAllUsers(filter);
    utils.addAction(userId);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post('/login', async (req, res, next) => {
  const { name, email } = req.body;
  const filter = '?name=' + name + '&email=' + email;
  try {
    const user = await usersService.getUserLogin(filter);
    if (user.length === 1) {
      const userId = user[0]._id;
      const SECRET_KEY = 'some_key';
      const token = jwt.sign({ id: userId }, SECRET_KEY, {
        noTimestamp: true,
        expiresIn: '1h',
      });
      res.status(200).json({ token });
    } else {
      res.status(500).json(user);
    }
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
