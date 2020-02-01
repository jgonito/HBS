const {Role} = require("../models");

module.exports = {
    "get": async (id = null) => {
        try {
            if (id) {
                return (await Role.findById(id)).toObject();
            }
            return (await Role.find()).map(p=>p.toObject());
        } catch (err) {
            throw err;
        }
    },
    "getPermissions": async () => {
        try {
            return await Role.PERMISSION;
        } catch (err) {
            throw err;
        }
    },
    "create": async (args, userID) => {
        try {
            const role = new Role();
            role.name = args.name;
            role.permissions = args.permissions
            ("description" in args) && (role.description = args.description);
            role.createdBy = userID;
            await role.save();
            return role.toObject();
        } catch (err) {
            throw err;
        }
    },
    "update": async (id, args, userID) => {
        try {
            const role = await Role.findById(id);
            ("name" in args) && (role.name = args.name);
            ("permissions" in args) && (role.permissions = args.permissions);
            ("description" in args) && (role.description = args.description);
            role.updatedBy = userID;
            await role.save();
            return role.toObject();
        } catch (err) {
            throw err;
        }
    },
    "delete": async (id) => {
        try {
            const role = await Role.findById(id);
            await role.delete();
            return role.toObject();
        } catch (err) {
            throw err;
        }
    }
};