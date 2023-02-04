const router = require("express").Router();
const postController = require("../controllers/postController");
const requireUser = require("../middlewares/requireUser");

router.delete("/", requireUser, postController.deletePostController);
router.post("/", requireUser, postController.createPostController);
router.post("/like", requireUser, postController.likeAndUnlikePost);
router.put("/", requireUser, postController.updatePostController);

module.exports = router;
