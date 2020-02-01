const {query, validationResult} = require("express-validator");
const service = require("../services/budget");

module.exports = {
    "validateInput": (action) => {
        switch (action) {
            case "create":
                return [
                    query("amount")
                        .isFloat({min:1.0}),
                    query("thresholdAmount")
                        .isFloat({min:1.0}),
                    query("dateFrom")
                        .isISO8601()
                        .toDate(),
                    query("dateTo")
                        .isISO8601()
                        .toDate()
                ];
            case "update":
                return [
                    query("amount")
                        .optional()
                        .isFloat({min:1.0}),
                    query("thresholdAmount")
                        .optional()
                        .isFloat({min:1.0}),
                    query("dateFrom")
                        .optional()
                        .isISO8601()
                        .toDate(),
                    query("dateTo")
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
    }
};