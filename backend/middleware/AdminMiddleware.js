const isAdmin = (req, res, next) => {
  try {
    const user = req.user;
    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .json({ status: false, message: "Access denied. Admin only" });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = isAdmin;
