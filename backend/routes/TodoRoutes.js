const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  getAllTodos,
} = require("../controllers/TodoControllers");
const isAdmin = require("../middleware/AdminMiddleware");
const { ensureAuthenticated } = require("../middleware/Auth");

const router = require("express").Router();

router.get("/getTodo", ensureAuthenticated, getTodos);
router.post("/create", ensureAuthenticated, createTodo);
router.put("/update/:id", ensureAuthenticated, updateTodo);
router.delete("/delete/:id", ensureAuthenticated, deleteTodo);
router.get("/all", ensureAuthenticated, isAdmin, getAllTodos);

module.exports = router;
