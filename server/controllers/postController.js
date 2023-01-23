const { success } = require("../utils/responseWrapper");

const getAllPostController = async (req, res) => {
  return res.send(success(200, "these are all posts"));
};
module.exports = { getAllPostController };
