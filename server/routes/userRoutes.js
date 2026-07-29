const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    followUser,
    unfollowUser,
    getProfile,
    updateProfile,
    searchUsers
} = require("../controllers/userController");

/*
    Follow User
*/

router.put(
    "/follow/:id",
    authMiddleware,
    followUser
);

router.put(
    "/unfollow/:id",
    authMiddleware,
    unfollowUser
);

/*
    Get Profile
*/

// Logged-in user's profile
router.get(
    "/profile",
    authMiddleware,
    getProfile
);

// Any user's profile
router.get(
    "/:id/profile",
    getProfile
);

/*
    Update Profile
*/

router.put(
    "/profile",
    authMiddleware,
    upload.single("profilePicture"),
    updateProfile
);

/*
    Search Users
*/

router.get(
    "/search",
    authMiddleware,
    searchUsers
);

module.exports = router;