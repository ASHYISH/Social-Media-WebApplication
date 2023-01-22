const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and Password are required");
    }

    const olduser = await User.findOne({ email });
    if (olduser) {
      return res.status(409).send("Email Already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and Password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("user is not registered");
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.status(403).send("Incorrect Password");
    }
    const accesToken = generateAccessToken({ _id: user._id });
    const refreshToken = generateRefreshToken({ _id: user._id });

    return res.json({ accesToken, refreshToken });
  } catch (error) {
    console.log(error);
  }
};
//internal function (that will not import )

const generateAccessToken = (data) => {
  const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
    expiresIn: "15m",
  });

  // console.log(token);

  return token;
};
const generateRefreshToken = (data) => {
  const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
    expiresIn: "1y",
  });

  // console.log(token);

  return token;
};

//Refresh Api
//this api will check the refresh token validity and generate a new access token

const refreshAccessTokenContoller = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).send("Refresh token is required");
  }
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY
    );
    // console.log(decoded);

    const _id = decoded._id;
    const accessToken = generateAccessToken({ _id });
    return res.status(201).json({ accessToken });
  } catch (error) {
    console.log(error);
    return res.status(401).send("Invalid refresh token");
  }
};

module.exports = {
  signupController,
  loginController,
  refreshAccessTokenContoller,
};
