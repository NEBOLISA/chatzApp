const chatModel = require("../Models/chatModel");

const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    if (chat) return res.status(200).json(chat);

    const newChat = new chatModel({
      members: [firstId, secondId],
    });
    const response = await newChat.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getAllUserChats = async (req, res) => {
  const userId = req.params.userId;
  try {
    const userChats = await chatModel.find({
      members: { $in: [userId] },
    });
    res.status(200).json(userChats);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getSingleChat = async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createChat, getAllUserChats, getSingleChat };
