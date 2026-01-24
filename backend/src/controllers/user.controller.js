const prisma = require("../prisma");

exports.getUserData = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if(!user) {
      console.log("User does not exist");
      res.status(404).json({success: false, message: "User does not exist"});
    }

    return res.status(200).json({success: true, data: user});
  } catch (error) {
    next(error);
  }
};