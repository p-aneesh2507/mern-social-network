const Message = require("../models/Message");

const {
    getUserSocket
} = require("../socket");


// Send Message
exports.sendMessage = async(req,res)=>{

    try{

        const { receiver, text } = req.body;


        const message = new Message({

            sender: req.user.id,

            receiver,

            text

        });


        // Save message in MongoDB
        await message.save();



        // Real-time message using Socket.io

        const receiverSocket = getUserSocket(receiver);


        if(receiverSocket){

            global.io
            .to(receiverSocket)
            .emit(
                "receiveMessage",
                message
            );

        }



        res.status(201).json({

            message:"Message sent successfully",

            data:message

        });



    }catch(error){

        res.status(500).json({

            error:error.message

        });

    }

};





// Get Conversation

exports.getMessages = async(req,res)=>{

    try{

        const userId = req.user.id;

        const otherUser = req.params.userId;



        const messages = await Message.find({

            $or:[

                {
                    sender:userId,
                    receiver:otherUser
                },

                {
                    sender:otherUser,
                    receiver:userId
                }

            ]

        })
        .sort({
            createdAt:1
        });



        res.status(200).json(messages);



    }catch(error){

        res.status(500).json({

            error:error.message

        });

    }

};