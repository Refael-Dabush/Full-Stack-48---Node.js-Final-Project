const Shift = require('../models/shiftModel');

const getAllShifts = (filters) => {
    return Shift.find(filters);
  };

  const addShift = (obj) => {
    const emp = new Shift(obj);
    return emp.save();
  };
  
  const updateShift = (id, obj) => {
    return Shift.findByIdAndUpdate(id, obj);
  };
  
  module.exports = {
    getAllShifts,
    addShift,
    updateShift
  };