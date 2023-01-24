const Post = require("../models/Post");
const User = require("../models/user");
const { error, success } = require("../utils/responseWrapper");

const followOrUnfollowUser = async (req, res) => {
  try {
    const { userIdToFollow } = req.body;
    const curUserId = req._id;
    if (curUserId === userIdToFollow) {
      return res.send(error(409, "Users cannot follow themselves"));
    }
    const userToFollow = await User.findById(userIdToFollow);

    const curUser = await User.findById(curUserId);

    if (!userToFollow) {
      return res.send(error(404, "User to follow not found"));
    }

    if (curUser.followings.includes(userIdToFollow)) {
      //already followed

      const followingIndex = curUser.followings.indexOf(userIdToFollow);
      curUser.followings.splice(followingIndex, 1);

      const followerIndex = userToFollow.followers.indexOf(curUserId);
      userToFollow.followers.splice(followerIndex, 1);

      await userToFollow.save();
      await curUser.save();

      return res.send(success(200, "User unfollowed"));
    } else {
      userToFollow.followers.push(curUserId);
      curUser.followings.push(userIdToFollow);

      await userToFollow.save();
      await curUser.save();
      return res.send(success(200, "User followed"));
    }
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getPostsOfFollowing = async (req, res) => {
  try {
    const curUserId = req._id;
    const curUser = await User.findById(curUserId);
    const posts = await Post.find({
      owner: {
        $in: curUser.followings,
      },
    });

    return res.send(success(200, posts));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

module.exports = {
  followOrUnfollowUser,
  getPostsOfFollowing,
  //getmyposts
  //deletemyprofile
  //getanyuserposts
};
