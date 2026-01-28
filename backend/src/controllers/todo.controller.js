const prisma = require("../prisma");
const { createTodoSchema } = require("../validators/todo.validator");

exports.getTodos = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const todos = await prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    next(error);
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const data = createTodoSchema.parse(req.body);

    const todo = await prisma.todo.create({
      data: { ...data, userId },
    });

    res.status(201).json({ success: true, data: todo });
  } catch (err) {
    next(err);
  }
};

exports.toggleTodo = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const id = Number(req.params.id);

    // First, fetch the current todo to get its current completed status
    const currentTodo = await prisma.todo.findUnique({
      where: { id, userId },
    });

    if (!currentTodo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }

    // Then update with the opposite value
    const todo = await prisma.todo.update({
      where: { id, userId },
      data: {
        completed: !currentTodo.completed,
      },
    });

    res.status(200).json({ success: true, data: todo });
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const id = Number(req.params.id);

    await prisma.todo.delete({ where: { id, userId } });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
