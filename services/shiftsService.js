const shiftRepoDB = require('../repositories/shiftRepoDB');
const employeeRepoDB = require('../repositories/employeeRepoDB');

const getAllShifts = (filters) => {
    return shiftRepoDB.getAllShifts(filters);
}

const addShift = (obj) => {
    return shiftRepoDB.addShift(obj);
}

const addEmployeeToShift = (shiftId, employeeId) => {
    const obj = {shifts: {shiftId: shiftId, _id: employeeId} };
    return employeeRepoDB.updateEmployee(employeeId, obj);
}

const updateShift = (id, obj) => {
    return shiftRepoDB.updateShift(id, obj);
}

module.exports = {
    getAllShifts,
    addShift,
    addEmployeeToShift,
    updateShift
  };