const {Expense} = require("../models");

module.exports = {
    "get": async (id = null) => {
        try {
            if (id) {
                return (await Expense.findById(id).populate("category")).toObject();
            }
            return (await Expense.find().populate("category")).map(p=>p.toObject());
        } catch (err) {
            throw err;
        }
    },
    "create": async (args, userID) => {
        try {
            const expense = new Expense();
            expense.name = args.name;
            expense.category = args.category;
            expense.amount = args.amount;

            if ("dueDate" in args) {
                expense.dueDate = args.dueDate;
                expense.recurring = null;
            } else {
                let recurringData = {
                    startDate: null,
                    schedule: {}
                };
                recurringData.startDate = args.recurring.startDate;
                ("endDate" in args.recurring) && (recurringData.endDate = args.recurring.endDate);

                // prioritize 'daysOfMonth' than 'daysOfWeek'
                if ("daysOfMonth" in args.recurring) {
                    recurringData.schedule.daysOfMonth = args.recurring.daysOfMonth;
                } else {
                    recurringData.schedule.daysOfWeek = args.recurring.daysOfWeek;
                }

                ("months" in args.schedule) && (recurringData.schedule.months = args.recurring.schedule.months);

                expense.recurring = recurringData;
                expense.dueDate = null;
            }

            ("details" in args) && (expense.details = args.details);
            expense.createdBy = userID;
            await expense.save();
            return (await expense.populate("category").execPopulate()).toObject();
        } catch (err) {
            throw err;
        }
    },
    "update": async (id, args, userID) => {
        try {
            const expense = await Expense.findById(id);
            ("name" in args) && (expense.name = args.name);
            ("category" in args) && (expense.category = args.category);
            ("amount" in args) && (expense.amount = args.amount);

            if ("dueDate" in args) {
                expense.dueDate = args.dueDate;
                expense.recurring = null;
            } else if ("recurring" in args) {
                let recurringData = {
                    startDate: null,
                    schedule: {}
                };
                recurringData.startDate = args.recurring.startDate;
                ("endDate" in args.recurring) && (recurringData.endDate = args.recurring.endDate);

                // prioritize 'daysOfMonth' than 'daysOfWeek'
                if ("daysOfMonth" in args.recurring) {
                    recurringData.schedule.daysOfMonth = args.recurring.daysOfMonth;
                } else {
                    recurringData.schedule.daysOfWeek = args.recurring.daysOfWeek;
                }

                ("months" in args.schedule) && (recurringData.schedule.months = args.recurring.schedule.months);

                expense.recurring = recurringData;
                expense.dueDate = null;
            }

            ("details" in args) && (expense.details = args.details);
            expense.updatedBy = userID;
            await expense.save();
            return (await expense.populate("category").execPopulate()).toObject();
        } catch (err) {
            throw err;
        }
    },
    "delete": async (id) => {
        try {
            const expense = await Expense.findById(id);
            await expense.delete();
            return (await expense.populate("category").execPopulate()).toObject();
        } catch (err) {
            throw err;
        }
    },
    "approve": async (id) => {
        try {
            const expense = await Expense.findById(id);
            // expense.approvedBy
            // expense.approvedAt
            await expense.save();
            return (await expense.populate("category").execPopulate()).toObject();
        } catch (err) {
            throw err;
        }
    },
    "reject": async (id) => {
        try {
            const expense = await Expense.findById(id);
            // expense.rejectedBy
            // expense.rejectedAt
            await expense.save();
            return (await expense.populate("category").execPopulate()).toObject();
        } catch (err) {
            throw err;
        }
    }
};