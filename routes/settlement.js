const controller = require("../controllers/settlement");
const authController = require("../controllers/auth");
const router = require("express").Router();

router.get("/:id?"        , authController.validate, authController.hasPermission("SETTLEMENT_GET")    , controller.get);
router.post("/"           , authController.validate, authController.hasPermission("SETTLEMENT_CREATE") , controller.validateInput("create"), controller.create);
router.put("/:id"         , authController.validate, authController.hasPermission("SETTLEMENT_UPDATE") , controller.validateInput("update"), controller.update);
router.delete("/:id"      , authController.validate, authController.hasPermission("SETTLEMENT_DELETE") , controller.delete);

module.exports = router;