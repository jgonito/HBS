const controller = require("../controllers/budget");
const authController = require("../controllers/auth");
const router = require("express").Router();

router.get("/:id?"  , authController.validate, authController.hasPermission("BUDGET_GET")   , controller.get);
router.post("/"     , authController.validate, authController.hasPermission("BUDGET_CREATE"), controller.validateInput("create"), controller.create);
router.put("/:id"   , authController.validate, authController.hasPermission("BUDGET_UPDATE"), controller.validateInput("update"), controller.update);
router.delete("/:id", authController.validate, authController.hasPermission("BUDGET_DELETE"), controller.delete);

module.exports = router;