require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

let prisma;

try {
  console.log("Initializing Prisma Client...");
  console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });
  
  console.log("Prisma Client initialized successfully");
  console.log("Prisma has user model:", !!prisma.user);
} catch (error) {
  console.error("Failed to initialize Prisma Client:", error);
  console.error("Error stack:", error.stack);
  throw error;
}

module.exports = prisma;
