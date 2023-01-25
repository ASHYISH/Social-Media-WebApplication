const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { error } = require("../utils/responseWrapper");

module.exports = async (req, res, next) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.send(error(401, "Authorization header is required"));
  }

  const accesToken = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(
      accesToken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );

    req._id = decoded._id;
    const user = await User.findById(req._id);
    if (!user) {
      return res.send(error(404, "User not found"));
    }

    next();
  } catch (e) {
    return res.send(error(401, "Invalid Access Key"));
  }
};
