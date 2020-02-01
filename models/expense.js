const {Schema} = require("mongoose");

const Expense = new Schema({
    name: {
        type: String,
        required: true
    },
    details: String,
    category: {
        type: Schema.ObjectId,
        ref: "Category"
    },
    amount: {
        type: Number,
        required: true
    },
    dueDate: Date,
    recurring: {
        // AIM: Every [(Mo|1st)] of (Month|[Jan])
        startDate: Date,
        endDate: Date,
        schedule: {
            daysOfWeek: {
                type: [String],
                enum: ["Mo","Tu","We","Th","Fr","Sa","Su"]
            },
            daysOfMonth: {
                type: [String],
                enum: [
                    "1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th",
                    "11th","12th","13th","14th","15th","16th","17th","18th","19th","20th",
                    "21st","22nd","23rd","24th","25th","26th","27th","28th","29th","30th","31st","last"
                ]
            },
            months: {
                type: [String],
                enum: [
                    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ]
            }
        }
    },
    createdBy: {
        type: Schema.ObjectId,
        ref: "User"
    },
    updatedBy: {
        type: Schema.ObjectId,
        ref: "User"
    },
    approvedBy: {
        type: Schema.ObjectId,
        ref: "User"
    },
    approvedAt: Date,
    rejectedBy: {
        type: Schema.ObjectId,
        ref: "User"
    },
    rejectedAt: Date
});

module.exports = Expense;