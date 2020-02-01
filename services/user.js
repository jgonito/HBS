const {User} = require("../models");

module.exports = {
    "get": async (id = null) => {
        try {
            if (id) {
                return (await User.findById(id).populate("role")).toObject();
            }
            return (await User.find().populate("role")).map(p=>p.toObject());
        } catch (err) {
            throw err;
        }
    },
    "create": async (args, userID) => {
        try {
            const user = new User();
            user.lastName = args.lastName;
            user.firstName = args.firstName;
            user.username = args.username;
            user.password = args.password;
            user.role = args.role;
            ("nickname" in args) && (user.nickname = args.nickname);
            ("active" in args) && (user.active = args.active);
            user.createdBy = userID;
            await user.save();
            return (await user.populate("role").execPopulate()).toObject();
        } catch (err) {
            throw err;
        }
    },
    "update": async (id, args, userID) => {
        try {
            const user = await User.findById(id);
            ("lastName" in args) && (user.lastName = args.lastName);
            ("firstName" in args) && (user.firstName = args.firstName);
            ("username" in args) && (user.username = args.username);
            ("role" in args) && (user.role = args.role);
            ("nickname" in args) && (user.nickname = args.nickname);
            ("active" in args) && (user.active = args.active);
            user.updatedBy = userID;
            await user.save();
            return (await user.populate("role").execPopulate()).toObject();
        } catch (err) {
            throw err;
        }
    },
    "delete": async (id) => {
        try {
            const user = await User.findById(id);
            await user.delete();
            return (await user.populate("role").execPopulate()).toObject();
        } catch (err) {
            throw err;
        }
    }
};