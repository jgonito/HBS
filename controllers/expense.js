const {query, validationResult, oneOf} = require("express-validator");
const service = require("../services/expense");

module.exports = {
    "validateInput": (action) => {
        switch (action) {
            case "create":
                return [
                    // validation
                    query("name")
                        .not().isEmpty()
                        .trim(),
                    query("category")
                        .isMongoId(),
                    query("amount")
                        .isFloat({min:1.0}),
                    oneOf([
                        query("dueDate")
                            .isISO8601()
                            .toDate(),
                        query("recurring")
                            .exists()
                            .custom((value, {req}) => {
                                if (!+new Date(value.startDate)) {
                                    return false;
                                }

                                if ("endDate" in value && !+new Date(value.endDate)) {
                                    return false;
                                }

                                if (!("schedule" in value)) {
                                    return false;
                                }
                                const schedule = value.schedule;
                                
                                switch (true) {
                                    case schedule.daysOfWeek instanceof Array:
                                    case schedule.daysOfMonth instanceof Array:
                                        break;
                                    default:
                                        return false;
                                }

                                if ("months" in schedule && !(schedule.months instanceof Array)) {
                                    return false;
                                }

                                query("recurring.startDate").toDate();
                                query("recurring.endDate").toDate();

                                return true;
                            })
                    ]),

                    // sanitazions
                    query("details")
                        .trim()
                ];
            case "update":
                return [
                    // validation
                    query("name")
                        .optional()
                        .not().isEmpty()
                        .trim(),
                    query("category")
                        .optional()
                        .isMongoId(),
                    query("amount")
                        .optional()
                        .isFloat({min:1.0}),
                    query("dueDate")
                        .optional()
                        .isISO8601()
                        .toDate(),
                    query("recurring")
                        .optional()
                        .exists()
                        .custom((value, {req}) => {
                            if (!+new Date(value.startDate)) {
                                return false;
                            }

                            if ("endDate" in value && !+new Date(value.endDate)) {
                                return false;
                            }

                            if (!("schedule" in value)) {
                                return false;
                            }
                            const schedule = value.schedule;
                            
                            switch (true) {
                                case schedule.daysOfWeek instanceof Array:
                                case schedule.daysOfMonth instanceof Array:
                                    break;
                                default:
                                    return false;
                            }

                            if ("months" in schedule && !(schedule.months instanceof Array)) {
                                return false;
                            }

                            query("recurring.startDate").toDate();
                            query("recurring.endDate").toDate();

                            return true;
                        }),
                    // sanitazions
                    query("details")
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