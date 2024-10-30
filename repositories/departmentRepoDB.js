const Department = require('../models/departmentModel');

const getAllDepartments = () => {
    return Department.find();
}

const getDepartmentById = (departmentId) => {
    return Department.findById(departmentId);
  };

  const addDepartment = (department) => {
    const dep = new Department(department);
    return dep.save();
  }

  const updateDepartment = (id, obj) => {
    return Department.findByIdAndUpdate(id, obj);
  };
  
  const deleteDepartment = (id) => {
    return Department.findByIdAndDelete(id);
  };

  const deleteAllDepartments = () => {
    return Department.deleteMany({});
  }
  
  module.exports = {
    getAllDepartments,
    getDepartmentById,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    deleteAllDepartments
  };