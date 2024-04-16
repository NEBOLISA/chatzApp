const messageModel = require("../Models/messageModel");

const createMessage = async (req, res) => {
  const { text, chatId, senderId } = req.body;
  try {
    const message = new messageModel({
      chatId,
      senderId,
      text,
    });
    const response = await message.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getUserMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const userMessages = await messageModel.find({ chatId });
    res.status(200).json(userMessages);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createMessage, getUserMessages };
