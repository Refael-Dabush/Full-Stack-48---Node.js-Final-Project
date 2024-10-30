const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shiftSchema = new Schema(
    {
        date: {type: Date, required: true},
        startingHour: {type: Number},
        endingHour: {type: Number}
    }
);

const Shift = mongoose.model('shift', shiftSchema, 'shifts');

module.exports = Shift;