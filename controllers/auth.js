const {query, validationResult} = require("express-validator");
const service = require("../services/auth");
const roleService = require("../services/role");

module.exports = {
    "validate": async (req, res, next) => {
        const token = req.headers["x-access-token"];

        if (!token) {
            return res.status(401).send("Access denied. No token provided.");
        }

        try {
            req.user = await service.verify(token, req.app.locals.redisClient);
            next();
        } catch (err) {
            res.status(400).send("Invalid token.");
        }
    },
    "hasPermission": (permission) => {
        return async (req, res, next) => {
            try {
                const role = await roleService.get(req.user.role);
                if (role.permissions.indexOf(permission) > -1) {
                    next();
                } else {
                    res.status(401).send("Unauthorized access");
                }
            } catch (err) {
                res.status(500).send(err.message);
            }
        }
    },
    "validateLogin": () => {
        return [
            query("username")
                .not().isEmpty(),
            query("password")
                .not().isEmpty()
        ];
    },
    "login": async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({"errors":errors.array()});
        }

        try {
            const {username, password} = req.query;
            const {token, user} = await service.login(username, password);
            if (token && user) {
                res.header("x-access-token", token).send(user);
            } else {
                res.status(500).send("INVALID USER");
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    "logout": async (req, res, next) => {
        const token = req.headers["x-access-token"];

        if (!token) {
            return res.status(401).send("Access denied. No token provided.");
        }
        
        try {
            await service.logout(token, req.app.locals.redisClient);
            res.removeHeader("x-access-token");
            res.send(true);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
};