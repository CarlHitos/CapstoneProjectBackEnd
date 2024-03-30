const { Schema, model } = require('mongoose');

const scheduleSchema = new Schema(
    {
        days: [String],
        hours: {
            start: String,
            end: String
        }
    },
    { _id: false }
);

module.exports = scheduleSchema;