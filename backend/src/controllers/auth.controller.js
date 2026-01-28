const prisma = require("../prisma");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { signToken } = require("../utils/jwt");

exports.register = async (req, res, next) => {
  try {
    console.log("Register endpoint called");
    console.log("Request body:", req.body);

    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required"
      });
    }

    console.log("Checking prisma...");
    if (!prisma) {
      console.error("Prisma is undefined!");
      return res.status(500).json({ success: false, message: "Database connection error: Prisma not initialized" });
    }

    if (!prisma.user) {
      console.error("prisma.user is undefined!");
      return res.status(500).json({ success: false, message: "Database connection error: User model not available" });
    }

    console.log("Checking for existing email...");
    const ogEmail = await prisma.user.findUnique({
      where: {
        email,
      }
    });

    if (ogEmail) {
      return res.status(409).json({ success: false, message: "Email already exists" });
    }

    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Creating user...");
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    });

    console.log("User created, generating token...");
    const accessToken = signToken({
      userId: user.id,
    });

    const refreshToken = crypto.randomBytes(40).toString("hex");

    console.log("Registration successful");
    res.json({ success: true, accessToken, refreshToken });
  } catch (error) {
    console.error("Error in register:", error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!prisma || !prisma.user) {
      return res.status(500).json({ success: false, message: "Database connection error" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const accessToken = signToken({
      userId: user.id,
    });

    const refreshToken = crypto.randomBytes(40).toString("hex");

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ),
      },
    });

    res.json({ success: true, accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

exports.refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ success: false, message: "Refresh token required" });
    }

    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!storedToken) {
      return res.status(401).json({ success: false, message: "Invalid refresh token" });
    }

    if (storedToken.expiresAt < new Date()) {
      return res.status(401).json({ success: false, message: "Refresh token expired" });
    }

    const accessToken = signToken({
      userId: storedToken.user.id,
    });

    res.json({ success: true, accessToken });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if(!refreshToken) {
      res.status(400).json({success: false, message: "Refresh token required"});
    }

    await prisma.refreshToken.deleteMany({
      where: {
        token: refreshToken
      }
    });

    res.status(204).json({success: true, message: "Logged out successfully"});
  } catch (error) {
    next(error);
  }
};
