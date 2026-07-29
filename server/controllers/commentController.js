const Comment = require("../models/Comment");



exports.createComment = async(req,res)=>{

    try{

        const {text}=req.body;


        const comment = new Comment({

            user:req.user.id,

            post:req.params.postId,

            text

        });


        await comment.save();


        res.status(201).json({

            message:"Comment added successfully",

            comment

        });


    }
    catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};




exports.getComments = async(req,res)=>{

    try{


        const comments = await Comment.find({

            post:req.params.postId

        })

        .populate(
            "user",
            "name email"
        )

        .sort({
            createdAt:-1
        });



        res.status(200).json(comments);


    }
    catch(error){


        res.status(500).json({

            error:error.message

        });


    }

};




exports.deleteComment = async(req,res)=>{

    try{


        const comment = await Comment.findById(
            req.params.id
        );


        if(!comment){

            return res.status(404).json({

                message:"Comment not found"

            });

        }



        if(comment.user.toString() !== req.user.id){


            return res.status(403).json({

                message:"You can delete only your comment"

            });


        }



        await comment.deleteOne();



        res.json({

            message:"Comment deleted successfully"

        });


    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

};