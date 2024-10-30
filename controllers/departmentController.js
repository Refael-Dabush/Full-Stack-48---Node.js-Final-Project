const express = require('express');
const departmentService = require('../services/departmentService');

const utils = require('../utiles');

const router = express.Router();

router.get('/', async (req, res, next) => {
    const { valid, userId } = await utils.checkToken(req, res);
    if (!valid) return;
    try {
        const departmentWithEmployees = await departmentService.getAllDepartmentsWithEmployeesName();
        utils.addAction(userId);
        res.status(200).json(departmentWithEmployees);
    } catch(error) {
        res.status(500).json(error.message);
    }
})

router.get('/department-list', async (req, res, next) => {
    const { valid, userId } = await utils.checkToken(req, res);
    if (!valid) return;
    try {
        const departmentList = await departmentService.getDepartmentsListOfName();
        utils.addAction(userId);
        res.status(200).json(departmentList);
    }catch (err) {
        res.status(500).json(err.message);
    }
})

router.post('/new-department', async (req, res, next) => {
    const { valid, userId } = await utils.checkToken(req, res);
    if (!valid) return;
    try {
        const obj = req.body;
        const result = await departmentService.addDepartment(obj);
        utils.addAction(userId);
        res.status(200).json(result);
    }catch (err) {
        res.status(500).json(err.message);
    }
})

router.patch('/:id', async (req, res, next) => {
    const { valid, userId } = await utils.checkToken(req, res);
    if (!valid) return;
    try {
        const { id } = req.params;
        const obj = req.body;
        const result = await departmentService.updatedDepartment(id, obj);
        utils.addAction(userId);
        res.status(200).json(result);
    }catch(err) {
        res.status(500).json(err.message);
    }
})

router.delete('/:id', async (req, res, next) => {
    const { valid, userId } = await utils.checkToken(req, res);
    if (!valid) return;
    try {
        const { id } = req.params;
        const result = await departmentService.deleteDepartment(id);
        utils.addAction(userId);
        res.status(200).json(result);
    }catch(err) {
        res.status(500).json(err.message);
    }
})

router.delete('/all', async (req, res, next) => {
    const { valid, userId } = await utils.checkToken(req, res);
    if (!valid) return;
    try {
        const result = await departmentService.deleteAllDepartments();
        utils.addAction(userId);
        res.status(201).json(result);
    }catch (err) {
        res.status(500).json(err.message);
    }
})

module.exports = router;