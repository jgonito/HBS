const {Schema} = require("mongoose");

const Budget = new Schema({
    amount: {
        type: Number,
        required: true
    },
    thresholdAmount: {
        type: Number,
        required: true
    },
    dateFrom: {
        type: Date,
        required: true
    },
    dateTo: {
        type: Date,
        required: true
    },
    createdBy: {
        type: Schema.ObjectId,
        ref: "User"
    },
    updatedBy: {
        type: Schema.ObjectId,
        ref: "User"
    }
});

module.exports = Budget;