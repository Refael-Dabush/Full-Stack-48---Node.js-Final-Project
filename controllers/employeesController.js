const express = require('express');
const employeesService = require('../services/employeesService');

const utils = require('../utiles');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { valid, userId } = await utils.checkToken(req, res);
  if (!valid) return;
  try {
    const filters = req.query;
    console.log('filters: ', filters);
    const employees = await employeesService.getEmployeesInfo(filters);
    utils.addAction(userId);
    res.status(200).json(employees);
  } catch (error) {
    res.json(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { valid, userId } = await utils.checkToken(req, res);
  if (!valid) return;
  try {
    const { id } = req.params;
    const employee = await employeesService.getById(id);
    utils.addAction(userId);
    res.json(employee);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/addEmployee', async (req, res, next) => {
  const { valid, userId } = await utils.checkToken(req, res);
  if (!valid) return;
  try {
    const obj = req.body;
    const result = await employeesService.addEmployee(obj);
    utils.addAction(userId);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.patch('/:id', async (req, res) => {
  const { valid, userId } = await utils.checkToken(req, res);
  if (!valid) return;
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await employeesService.updateEmployee(id, obj);
    utils.addAction(userId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/:id', async (req, res, next) => {
  const { valid, userId } = await utils.checkToken(req, res);
  if (!valid) return;
  try {
    const { id } = req.params;
    const shiftId = req.body.shiftId;
    const result = await employeesService.addShiftToEmployee(id, shiftId);
    utils.addAction(userId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.patch('/remove-dep', async (req, res, next) => {
  const { valid, userId } = await utils.checkToken(req, res);
  if (!valid) return;
  try {
    const result = await employeesService.removeDepartmentFromAll();
    utils.addAction(userId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { valid, userId } = await utils.checkToken(req, res);
  if (!valid) return;
  try {
    const { id } = req.params;
    const result = await employeesService.deleteEmployee(id);
    if (result === null) {
      res.status(204).json('The employee is not exist');
    }
    utils.addAction(userId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
