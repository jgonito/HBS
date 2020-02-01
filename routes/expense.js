const controller = require("../controllers/expense");
const authController = require("../controllers/auth");
const router = require("express").Router();

router.get("/:id?"        , authController.validate, authController.hasPermission("EXPENSE_GET")    , controller.get);
router.post("/"           , authController.validate, authController.hasPermission("EXPENSE_CREATE") , controller.validateInput("create"), controller.create);
router.post("/:id/approve", authController.validate, authController.hasPermission("EXPENSE_APPROVE"), controller.approve);
router.post("/:id/reject" , authController.validate, authController.hasPermission("EXPENSE_REJECT") , controller.reject);
router.put("/:id"         , authController.validate, authController.hasPermission("EXPENSE_UPDATE") , controller.validateInput("update"), controller.update);
router.delete("/:id"      , authController.validate, authController.hasPermission("EXPENSE_DELETE") , controller.delete);

module.exports = router;