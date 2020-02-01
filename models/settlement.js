const {Schema} = require("mongoose");

const Settlement = new Schema({
    expense: {
        type: Schema.ObjectId,
        ref: "Expense"
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
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

module.exports = Settlement;