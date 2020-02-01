const controller = require("../controllers/role");
const authController = require("../controllers/auth");
const router = require("express").Router();

router.get("/permissions", authController.validate, authController.hasPermission("ROLE_GET")   , controller.getPermissions);
router.get("/:id?"       , authController.validate, authController.hasPermission("ROLE_GET")   , controller.get);
router.post("/"          , authController.validate, authController.hasPermission("ROLE_CREATE"), controller.validateInput("create"), controller.create);
router.put("/:id"        , authController.validate, authController.hasPermission("ROLE_UPDATE"), controller.validateInput("update"), controller.update);
router.delete("/:id"     , authController.validate, authController.hasPermission("ROLE_DELETE"), controller.delete);

module.exports = router;