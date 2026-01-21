const prisma = require("../prisma");
const { createTodoSchema } = require("../validators/todo.validator");

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, data: todos });
  } catch (err) {
    next(err);
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    const data = createTodoSchema.parse(req.body);

    const todo = await prisma.todo.create({ data });

    res.status(201).json({ success: true, data: todo });
  } catch (err) {
    next(err);
  }
};

exports.toggleTodo = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const todo = await prisma.todo.update({
      where: { id },
      data: {
        completed: { not: true },
      },
    });

    res.json({ success: true, data: todo });
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    await prisma.todo.delete({ where: { id } });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
