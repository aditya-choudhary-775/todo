// Load environment variables FIRST, before any other imports
require("dotenv").config();

// Verify critical environment variables are loaded
if (!process.env.JWT_SECRET) {
  console.error("⚠️  WARNING: JWT_SECRET is not defined in .env file!");
} else {
  console.log("✅ JWT_SECRET loaded successfully");
}

const app = require("./app");

const PORT = process.env.PORT || 4000;

// Test Prisma connection on startup
const prisma = require("./prisma");
console.log("Testing Prisma connection...");
prisma.$connect()
  .then(() => {
    console.log("✅ Prisma connected successfully");
  })
  .catch((err) => {
    console.error("❌ Prisma connection failed:", err);
  });

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
