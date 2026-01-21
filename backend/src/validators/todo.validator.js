const { z } = require("zod");

exports.createTodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),

  dueDate: z.preprocess(
    (val) => (val ? new Date(val) : null),
    z.date().nullable()
  ),
});
