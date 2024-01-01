const { signUp, logIn } = require("../controllers/user");

const router = require("express").Router();

router.post("/signup", signUp);
router.post("/login", logIn);
module.exports = router;
