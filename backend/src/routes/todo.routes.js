const express = require("express");
const {
  getTodos,
  createTodo,
  toggleTodo,
  deleteTodo,
} = require("../controllers/todo.controller.js");

const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.patch("/:id/toggle", toggleTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
