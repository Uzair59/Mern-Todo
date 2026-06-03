const {
  signUp,
  login,
  getAllUsers,
} = require("../controllers/AuthControllers");
const isAdmin = require("../middleware/AdminMiddleware");
const { ensureAuthenticated } = require("../middleware/Auth");
const {
  signUpValidation,
  loginValidation,
} = require("../middleware/AuthValidations");

const router = require("express").Router();

router.post("/login", loginValidation, login);
router.post("/register", signUpValidation, signUp);
router.get("/users", ensureAuthenticated, isAdmin, getAllUsers);

module.exports = router;
