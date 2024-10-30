const express = require('express');
const shiftsService = require('../services/shiftsService');

const utils = require('../utiles');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { valid, userId } = await utils.checkToken(req, res);
  if (!valid) return;
  try {
    const filters = req.query;
    const result = await shiftsService.getAllShifts(filters);
    utils.addAction(userId);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post('/addShift', async (req, res, next) => {
  const { valid, userId } = await utils.checkToken(req, res);
  if (!valid) return;
  try {
    const obj = req.body;
    const result = await shiftsService.addShift(obj);
    utils.addAction(userId);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.patch('/addemployeetoshift', async (req, res) => {
    const { valid, userId } = await utils.checkToken(req, res);
    if (!valid) return;
    try {
      const {shiftId, employeeId} = req.body;
      console.log('shiftId', shiftId)
      console.log('employeeId', employeeId)
      const result = await shiftsService.addEmployeeToShift(shiftId, employeeId);
      utils.addAction(userId);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  });


  module.exports = router;