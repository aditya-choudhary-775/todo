module.exports = (err, req, res, next) => {
  console.error("=== ERROR ===");
  console.error("Message:", err.message);
  console.error("Stack:", err.stack);
  console.error("Full error:", err);
  console.error("=============");

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
