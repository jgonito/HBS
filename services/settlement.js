const {Settlement} = require("../models");

module.exports = {
    "get": async (id = null) => {
        try {
            if (id) {
                return (await Settlement.findById(id).populate("expense")).toObject();
            }
            return (await Settlement.find().populate("expense")).map(p=>p.toObject());
        } catch (err) {
            throw err;
        }
    },
    "create": async (args, userID) => {
        try {
            const settlement = new Settlement();
            settlement.expense = args.expense;
            settlement.amount = args.amount;
            settlement.date = args.date;
            settlement.createdBy = userID;
            await settlement.save();
            return (await settlement.populate("expense").execPopulate()).toObject();
        } catch (err) {
            throw err;
        }
    },
    "update": async (id, args, userID) => {
        try {
            const settlement = await Settlement.findById(id);
            ("expense" in args) && (settlement.expense = args.expense);
            ("amount" in args) && (settlement.amount = args.amount);
            ("date" in args) && (settlement.date = args.date);
            settlement.updatedBy = userID;
            await settlement.save();
            return (await settlement.populate("expense").execPopulate()).toObject();
        } catch (err) {
            throw err;
        }
    },
    "delete": async (id) => {
        try {
            const expense = await Settlement.findById(id);
            await expense.delete();
            return (await expense.populate("expense").execPopulate()).toObject();
        } catch (err) {
            throw err;
        }
    }
};