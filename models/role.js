const {Schema} = require("mongoose");

const PERMISSION = Object.freeze([
    "USER_GET",
    "USER_CREATE",
    "USER_UPDATE",
    "USER_DELETE",
    "ROLE_GET",
    "ROLE_CREATE",
    "ROLE_UPDATE",
    "ROLE_DELETE",
    "CATEGORY_GET",
    "CATEGORY_CREATE",
    "CATEGORY_UPDATE",
    "CATEGORY_DELETE",
    "BUDGET_GET",
    "BUDGET_CREATE",
    "BUDGET_UPDATE",
    "BUDGET_DELETE",
    "EXPENSE_GET",
    "EXPENSE_CREATE",
    "EXPENSE_UPDATE",
    "EXPENSE_DELETE",
    "EXPENSE_APPROVE",
    "EXPENSE_REJECT",
    "SETTLEMENT_GET",
    "SETTLEMENT_CREATE",
    "SETTLEMENT_UPDATE",
    "SETTLEMENT_DELETE"
]);

const Role = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    permissions: {
        type: [String],
        enum: Object.values(PERMISSION)
    }
});

Role.statics.PERMISSION = PERMISSION;

module.exports = Role;