const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo_controller");

router.get("/", todoController.dataTodo)
router.post("/", todoController.createTodo)
router.post("/:id", todoController.updateTodo)
router.post("/remove/:id", todoController.removeTodo)

module.exports = router
