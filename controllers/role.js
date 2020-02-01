const {query, validationResult} = require("express-validator");
const service = require("../services/role");

module.exports = {
    "validateInput": (action) => {
        switch (action) {
            case "create":
                return [
                    // validations
                    query("name")
                        .not().isEmpty()
                        .trim(),
                    query("permissions")
                        .isArray({min:1}),
                    // sanitazions
                    query("description")
                        .optional()
                        .trim()
                ];
            case "update":
                return [
                    // validations
                    query("name")
                        .optional()
                        .not().isEmpty()
                        .trim(),
                    query("permissions")
                        .optional()
                        .isArray({min:1}),
                    // sanitazions
                    query("description")
                        .optional()
                        .trim()
                ];
        }
    },
    "get": async (req, res, next) => {
        try {
            res.send(await service.get(req.params.id));
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    "getPermissions": async (req, res, next) => {
        try {
            res.send(await service.getPermissions());
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    "create": async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({"errors":errors.array()});
        }

        try {
            res.send(await service.create(req.query, req.user.id));
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    "update": async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({"errors":errors.array()});
        }

        try {
            res.send(await service.update(req.params.id, req.query, req.user.id));
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    "delete": async (req, res, next) => {
        try {
            res.send(await service.delete(req.params.id));
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
};