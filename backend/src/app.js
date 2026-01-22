const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todo.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://todo-drab-rho.vercel.app/",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());

app.use("/todos", todoRoutes);

// error middleware MUST be last
app.use(errorMiddleware);

module.exports = app;
