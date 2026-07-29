const Post = require("../models/Post");
const User = require("../models/User");
const Notification = require("../models/Notification");
exports.createPost = async (req, res) => {
    try {

        console.log(req.body);
        console.log(req.file);
        console.log(req.user);

        const post = await Post.create({
            user: req.user.id,
            content: req.body.content,
            image: req.file ? req.file.path : ""
        });

        res.status(201).json(post);

    } catch (error) {

        console.log(error);   // <-- ADD THIS

        res.status(500).json({
            error: error.message
        });

    }
};
exports.getPosts = async (req, res) => {
    try {

        const posts = await Post.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json(posts);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};
exports.likePost = async(req,res)=>{

    try{

        const post = await Post.findById(req.params.id);


        if(!post){

            return res.status(404).json({

                message:"Post not found"

            });

        }



        if(post.likes.includes(req.user.id)){

            return res.status(400).json({

                message:"Already liked"

            });

        }



        post.likes.push(req.user.id);


        await post.save();



        // notification

        if(post.user.toString() !== req.user.id){


            await Notification.create({

                recipient:post.user,

                sender:req.user.id,

                type:"like",

                post:post._id,

                message:"liked your post"

            });


        }



        res.status(200).json({

            message:"Post liked",

            likes:post.likes.length,

            post

        });



    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

};
exports.unlikePost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);


        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }


        // Check if user has liked the post
        if (!post.likes.includes(req.user.id)) {

            return res.status(400).json({
                message: "You have not liked this post"
            });

        }


        // Remove user from likes array
        post.likes = post.likes.filter(
            userId => userId.toString() !== req.user.id
        );


        await post.save();


        res.status(200).json({
            message: "Post unliked successfully",
            post
        });


    } catch(error) {

        res.status(500).json({
            error: error.message
        });

    }

};
exports.deletePost = async(req,res)=>{

    try{

        const post = await Post.findById(req.params.id);


        if(!post){
            return res.status(404).json({
                message:"Post not found"
            });
        }


        // check owner
        if(post.user.toString() !== req.user.id){

            return res.status(403).json({
                message:"You can delete only your post"
            });

        }


        await post.deleteOne();


        res.status(200).json({
            message:"Post deleted successfully"
        });


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};
exports.getFeed = async(req,res)=>{

    try{

        const user = await User.findById(req.user.id);


        const posts = await Post.find({

            user:{
                $in:user.following
            }

        })
        .populate("user","name email")
        .sort({
            createdAt:-1
        });


        res.status(200).json(posts);


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};
exports.getUserPosts = async (req,res)=>{

    try{

        const posts = await Post.find({
            user:req.params.id
        })
        .populate(
            "user",
            "name email profilePicture"
        )
        .sort({
            createdAt:-1
        });


        res.status(200).json(posts);


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};