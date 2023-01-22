const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.status(401).send("Authorization header is required");
  }

  const accesToken = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(
      accesToken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );

    req._id = decoded._id;
    next();
  } catch (error) {
    return res.status(401).send("Invalid Access Key");
  }
};
