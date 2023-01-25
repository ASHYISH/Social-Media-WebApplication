const requireUser = require("../middlewares/requireUser");
const UserController = require("../controllers/userController");

const router = require("express").Router();

router.post("/follow", requireUser, UserController.followOrUnfollowUser);
router.get("/getMyPosts", requireUser, UserController.getMyPosts);
router.get("/getUserPosts", requireUser, UserController.getUserPosts);
router.get(
  "/getPostsOfFollowing",
  requireUser,
  UserController.getPostsOfFollowing
);
router.delete("/", requireUser, UserController.deleteMyProfile);
module.exports = router;
