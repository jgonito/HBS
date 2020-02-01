const {Budget} = require("../models");

module.exports = {
    "get": async (id = null) => {
        try {
            if (id) {
                return (await Budget.findById(id)).toObject();
            }
            return (await Budget.find()).map(p=>p.toObject());
        } catch (err) {
            throw err;
        }
    },
    "create": async (args, userID) => {
        try {
            const budget = new Budget();
            budget.amount = args.amount;
            budget.thresholdAmount = args.thresholdAmount;
            budget.dateFrom = args.dateFrom;
            budget.dateTo = args.dateTo;
            budget.createdBy = userID;
            await budget.save();
            return budget.toObject();
        } catch (err) {
            throw err;
        }
    },
    "update": async (id, args, userID) => {
        try {
            const budget = await Budget.findById(id);
            ("amount" in args) && (budget.amount = args.amount);
            ("thresholdAmount" in args) && (budget.thresholdAmount = args.thresholdAmount);
            ("dateFrom" in args) && (budget.dateFrom = args.dateFrom);
            ("dateTo" in args) && (budget.dateTo = args.dateTo);
            budget.updatedBy = userID;
            await budget.save();
            return budget.toObject();
        } catch (err) {
            throw err;
        }
    },
    "delete": async (id) => {
        try {
            const budget = await Budget.findById(id);
            await budget.delete();
            return budget.toObject();
        } catch (err) {
            throw err;
        }
    }
};