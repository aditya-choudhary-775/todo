const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todo.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes);

// error middleware MUST be last
app.use(errorMiddleware);

module.exports = app;
