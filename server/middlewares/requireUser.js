const jwt = require("jsonwebtoken");
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
    next();
  } catch (e) {
    return res.send(error(401, "Invalid Access Key"));
  }
};
