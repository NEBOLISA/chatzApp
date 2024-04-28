const chatModel = require("../Models/chatModel");
const messageModel = require("../Models/messageModel");

const createChat = async (req, res) => {
  const { userId, recipientId } = req.body;
  try {
    const existingChat = await chatModel.findOne({
      members: { $all: [userId, recipientId] },
    });
    if (existingChat) {
      const isUserIdPresent = existingChat.deleteId.includes(userId);
      if (!isUserIdPresent) {
        existingChat.deleteId.push(userId);
        await existingChat.save();
      }
      return res.status(200).json(existingChat);
    }

    const newChatForUser = new chatModel({
      members: [userId, recipientId],
      deleteId: [userId, recipientId],
    });

    const response = await newChatForUser.save();

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllUserChats = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userChats = await chatModel
      .find({
        members: userId,
      })
      .where("members")
      .equals(userId);
    if (userChats) {
      const isNotDeletedChats = userChats.filter((chat) =>
        chat.deleteId.includes(userId)
      );
      // const uniqueMembersSet = new Set();
      // const uniqueChat = isNotDeletedChats.filter((obj) => {
      //   const membersString = JSON.stringify(obj.members);
      //   if (!uniqueMembersSet.has(membersString)) {
      //     uniqueMembersSet.add(membersString);
      //     return true;
      //   }
      //   return false;
      // });
      res.status(200).json(isNotDeletedChats);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
const getSingleChat = async (req, res) => {
  const { userId, recipientId } = req.params;
  try {
    const chat = await chatModel.findOne({
      members: [userId, recipientId],
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
const deleteSingleChat = async (req, res) => {
  const { userId, chatId } = req.params;

  try {
    const chat = await chatModel.findById(chatId);

    if (chat) {
      const remainingId = chat.deleteId.filter((id) => id !== userId);
      chat.deleteId = remainingId;

      const messages = await messageModel.find({ chatId });

      messages.map(async (message) => {
        const remainingId = message.deleteId.filter((id) => id !== userId);
        message.deleteId = remainingId;

        await message.save();
      });

      if (remainingId.length === 0) {
        await chat.deleteOne();
        await messageModel.deleteMany({ chatId });
        res.status(200).json({ data: "Chat deleted", status: 200 });
      } else {
        const response = await chat.save();
        res.status(200).json({ data: response, status: 200 });
      }
    } else {
      res.status(404).json({ message: "Chat not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createChat,
  getAllUserChats,
  getSingleChat,
  deleteSingleChat,
};
