const {query, validationResult} = require("express-validator");
const service = require("../services/user");

module.exports = {
    "validateInput": (action) => {
        switch (action) {
            case "create":
                return [
                    // validations
                    query("lastName")
                        .not().isEmpty()
                        .trim(),
                    query("firstName")
                        .not().isEmpty()
                        .trim(),
                    query("username")
                        .not().isEmpty()
                        .trim(),
                    query("password")
                        .not().isEmpty(),
                    query("role").isMongoId(),
                    // sanitazions
                    query("nickname")
                        .optional()
                        .trim()
                ];
            case "update":
                return [
                    // validations
                    query("lastName")
                        .optional()
                        .not().isEmpty()
                        .trim(),
                    query("firstName")
                        .optional()
                        .not().isEmpty()
                        .trim(),
                    query("username")
                        .optional()
                        .not().isEmpty()
                        .trim(),
                    // query("password")
                    //  .optional()
                    //  .not().isEmpty(),
                    query("role")
                        .optional()
                        .isMongoId(),
                    // sanitazions
                    query("nickname")
                        .optional()
                        .trim(),
                    query("active")
                        .optional()
                        .toBoolean()
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