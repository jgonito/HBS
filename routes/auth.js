const controller = require("../controllers/auth");
const express = require("express");
const loginRouter = express.Router();
const logoutRouter = express.Router();

loginRouter.post("/", controller.validateLogin(), controller.login);
logoutRouter.post("/", controller.validate, controller.logout);

module.exports = {
    login: loginRouter,
    logout: logoutRouter
};