const Employee = require('../models/employeeModel');

const getAllEmployees = (filters) => {
  return Employee.find(filters);
};

const getEmployeeById = (employeeId) => {
  return Employee.findById(employeeId);
};

const addEmployee = (obj) => {
  const emp = new Employee(obj);
  return emp.save();
};

const updateEmployee = (id, obj) => {
  return Employee.findByIdAndUpdate(id, obj);
};

const removeDepartmentFromMany = (filter) => {
    return Employee.updateMany(filter, [{$unset: ["departmentId"]}]);
}

const removeDepartmentFromAll = () => {
    return Employee.updateMany([{$unset: ["departmentId"]}]);
}

const deleteEmployee = (id) => {
  return Employee.findByIdAndDelete(id);
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  removeDepartmentFromMany,
  removeDepartmentFromAll,
  deleteEmployee
};
