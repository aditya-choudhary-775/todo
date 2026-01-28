const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todo.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const auth = require("./middlewares/auth.middleware");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://todo-drab-rho.vercel.app",
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

app.use("/api", authRoutes);
app.use(auth);
app.use("/api/user", userRoutes);
app.use("/api/todos", todoRoutes);
app.use(errorMiddleware);

module.exports = app;
