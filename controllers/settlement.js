const {query, validationResult} = require("express-validator");
const service = require("../services/settlement");

module.exports = {
    "validateInput": (action) => {
        switch (action) {
            case "create":
                return [
                    // validations
                    query("expense")
                        .isMongoId(),
                    query("amount")
                        .isFloat({min:1.0}),
                    query("date")
                        .isISO8601()
                        .toDate()
                ];
            case "update":
                return [
                    // validations
                    query("expense")
                        .optional()
                        .isMongoId(),
                    query("amount")
                        .optional()
                        .isFloat({min:1.0}),
                    query("date")
                        .optional()
                        .isISO8601()
                        .toDate()
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
    },
    "approve": async (req, res, next) => {
        try {
            res.send(await service.approve(req.params.id));
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    "reject": async (req, res, next) => {
        try {
            res.send(await service.reject(req.params.id));
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
};