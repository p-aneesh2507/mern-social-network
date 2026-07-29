const Notification = require("../models/Notification");



exports.getNotifications = async(req,res)=>{

    try{

        const notifications = await Notification.find({
            recipient:req.user.id
        })
        .populate("sender","name email")
        .sort({
            createdAt:-1
        });


        res.status(200).json(notifications);


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};