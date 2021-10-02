const router = require("express").Router();
const { login, register } = require("../controllers/userControllers");

router.post("/users/register", register);
router.post("/users/login", login);

module.exports = router;
