let users = {};


const addUser = (userId,socketId)=>{

    users[userId] = socketId;

};


const removeUser = (socketId)=>{

    for(let userId in users){

        if(users[userId] === socketId){

            delete users[userId];

        }

    }

};


const getUserSocket = (userId)=>{

    return users[userId];

};


module.exports = {
    addUser,
    removeUser,
    getUserSocket
};