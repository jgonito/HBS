const router = require("express").Router();
const auth = require("./auth");

router.use("/login"   , auth.login);
router.use("/logout"  , auth.logout);
router.use("/role"    , require("./role"));
router.use("/user"    , require("./user"));
router.use("/category", require("./category"));
router.use("/budget"  , require("./budget"));
router.use("/expense" , require("./expense"));

module.exports = router;