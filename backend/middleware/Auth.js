const jwt = require("jsonwebtoken");
const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token is required" });
  }
  try {
    const decodedData = jwt.verify(authHeader, process.env.JWT_SECRET);
    req.user = decodedData;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token wrong or expired" });
  }
};

module.exports = {
  ensureAuthenticated,
};
