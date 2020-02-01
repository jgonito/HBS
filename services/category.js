const {Category} = require("../models");

module.exports = {
    "get": async (id = null) => {
        try {
            if (id) {
                return (await Category.findById(id)).toObject();
            }
            return (await Category.find()).map(p=>p.toObject());
        } catch (err) {
            throw err;
        }
    },
    "create": async (args, userID) => {
        try {
            const category = new Category();
            category.name = args.name;
            ("description" in args) && (category.description = args.description);
            category.createdBy = userID;
            await category.save();
            return category.toObject();
        } catch (err) {
            throw err;
        }
    },
    "update": async (id, args, userID) => {
        try {
            const category = await Category.findById(id);
            ("name" in args) && (category.name = args.name);
            ("description" in args) && (category.description = args.description);
            category.updateBy = userID;
            await category.save();
            return category.toObject();
        } catch (err) {
            throw err;
        }
    },
    "delete": async (id) => {
        try {
            const category = await Category.findById(id);
            await category.delete();
            return category.toObject();
        } catch (err) {
            throw err;
        }
    }
};