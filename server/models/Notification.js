const mongoose = require("mongoose");


const notificationSchema = new mongoose.Schema({

    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    type:{
        type:String,
        required:true
    },

    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },

    message:{
        type:String
    }

},
{
    timestamps:true
});


module.exports = mongoose.model("Notification", notificationSchema);