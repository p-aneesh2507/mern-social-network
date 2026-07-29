const User = require("../models/User");
const Post = require("../models/Post");
const Notification = require("../models/Notification");

// =======================
// Follow User
// =======================

exports.followUser = async (req, res) => {

    try {

        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);

        if (!userToFollow) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        if (userToFollow.followers.includes(req.user.id)) {

            return res.status(400).json({
                message: "Already following"
            });

        }

        currentUser.following.push(req.params.id);
        userToFollow.followers.push(req.user.id);

        await currentUser.save();
        await userToFollow.save();

        await Notification.create({

            recipient: userToFollow._id,
            sender: req.user.id,
            type: "follow",
            message: "started following you"

        });

        res.status(200).json({
            message: "Follow successful"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

// =======================
// Unfollow User
// =======================

exports.unfollowUser = async (req, res) => {

    try {

        const userToUnfollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);

        currentUser.following = currentUser.following.filter(

            id => id.toString() !== req.params.id

        );

        userToUnfollow.followers = userToUnfollow.followers.filter(

            id => id.toString() !== req.user.id

        );

        await currentUser.save();
        await userToUnfollow.save();

        res.status(200).json({

            message: "User unfollowed successfully"

        });

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

};

// =======================
// Get Profile
// =======================

exports.getProfile = async (req, res) => {

    try {

        const userId = req.params.id || req.user.id;

        const user = await User.findById(userId)
            .select("-password")
            .populate("followers", "name email profilePicture")
            .populate("following", "name email profilePicture");

        if (!user) {

            return res.status(404).json({

                message: "User not found"

            });

        }

        const posts = await Post.find({

            user: userId

        }).sort({

            createdAt: -1

        });

        res.status(200).json({

            user,
            followersCount: user.followers.length,
            followingCount: user.following.length,
            posts

        });

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

};

// =======================
// Update Profile
// =======================

exports.updateProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({

                message: "User not found"

            });

        }

        if (req.body.name) {

            user.name = req.body.name;

        }

        if (req.body.email) {

            user.email = req.body.email;

        }

        if (req.body.bio !== undefined) {

            user.bio = req.body.bio;

        }

        if (req.file) {

            user.profilePicture = req.file.path;

        }

        await user.save();

        res.status(200).json({

            message: "Profile updated successfully",

            user

        });

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

};

// =======================
// Search Users
// =======================

exports.searchUsers = async (req, res) => {

    try {

        const keyword = req.query.search || "";

        const users = await User.find({

            $or: [

                {
                    name: {
                        $regex: keyword,
                        $options: "i"
                    }
                },

                {
                    email: {
                        $regex: keyword,
                        $options: "i"
                    }
                }

            ]

        }).select("-password");

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

};