import asyncHandler from "express-async-handler";
import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";

const accessChat = asyncHandler(async(req,res) => {

     const { userId }= req.body;

     if (!userId) {
       console.log("User Id param not sent with request");
       return res.sendStatus(400);
     }



  var isChat = await Chat.find({
        isGroupChat: false,
       /* $and:[
              { users:{$elemMatch:{$eq: req.user._id } } },
              { users:{$elemMatch:{$eq: userId } } },
        ],*/
  }).populate("users","-password").populate("latestMessage");

  isChat = await User.populate(isChat,{
           path: "latestMessage.sender",
           select:"name pic email",
  });

  if (isChat.length>0) {
           res.send(isChat[0]);
  } else {
              var chatData = {
                  chatName: "sender",
                  isGroupChat: false,
                  users:[/*req.user._id*/, userId],
              };

            try {

                const createdChat = await Chat.create(
                            chatData
                );

               const FullChat = await Chat.findOne({ _id:createdChat._id }).populate(
               "users","-password"
               );


            res.status(200).send(FullChat);

            } catch (error) {
                      res.status(400);
                      throw new Error("Error in access chat:",error.message);
            }

  }

});

const getChat = asyncHandler(async(req,res) => {
      try {

      //Chat.find({ users:{$elemMatch: {} })

      } catch (error) {

      }
})

const createGroupChat = asyncHandler(async(req,res) => {

})

const renameGroup = asyncHandler(async(req,res) => {

})

const removeFromGroup = asyncHandler(async(req,res) => {

})

const addToGroup = asyncHandler(async(req,res) => {

})



export {
   accessChat,
   getChat,
   createGroupChat,
   renameGroup,
   removeFromGroup,
   addToGroup
}