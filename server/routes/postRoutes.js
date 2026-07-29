const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    createPost,
    getPosts,
    likePost,
    unlikePost,
    deletePost,
    getFeed,
    getUserPosts
} = require("../controllers/postController");



router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    createPost
);


router.get("/", getPosts);


// NEW ROUTE FOR PROFILE POSTS
router.get("/user/:id", getUserPosts);


router.put("/:id/like", authMiddleware, likePost);


router.put("/:id/unlike", authMiddleware, unlikePost);


router.delete("/:id", authMiddleware, deletePost);


router.get("/feed", authMiddleware, getFeed);


module.exports = router;