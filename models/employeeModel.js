const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        startWorkYear: Number,
        departmentId: {type: Schema.Types.ObjectId, ref: 'department'},
        shifts: [
            {
                shiftId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Shift'
                }
            }
        ]
    },
    { versionKey: false }
);

const Employee = mongoose.model('employee', employeeSchema, 'employees');

module.exports = Employee;