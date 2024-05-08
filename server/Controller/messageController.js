const messageModel = require("../Models/messageModel");

const createMessage = async (req, res) => {
  const { text, chatId, senderId, receiverId } = req.body;
  try {
    const message = new messageModel({
      chatId,
      members: [senderId, receiverId],
      deleteId: [senderId, receiverId],
      senderId,
      text,
      receiverId,
    });

    const response = await message.save();

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getUserMessages = async (req, res) => {
  const { userId, senderId, receiverId } = req.params;

  try {
    const userMessages = await messageModel.find({
      members: { $all: [senderId, receiverId] },
    });

    if (userMessages) {
      const isNotDeletedMessages = userMessages.filter((message) =>
        message.deleteId.includes(userId)
      );
      res.status(200).json(isNotDeletedMessages);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
const deleteSingleMessage = async(req,res) =>{

}
module.exports = { createMessage, getUserMessages };
