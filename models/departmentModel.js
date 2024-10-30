const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const departmentSchema = new Schema(
    {
        name: {type: String, required: true},
        manager: {type: Schema.Types.ObjectId, ref: 'employee'}
    }
);

const Department = mongoose.model('department', departmentSchema, 'departments');

module.exports = Department;