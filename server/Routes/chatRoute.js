const express = require("express");
const router = express.Router();
const {
  createChat,
  getAllUserChats,
  getSingleChat,
  deleteSingleChat,
} = require("../Controller/chatController");


router.post("/", createChat);
router.get("/:userId", getAllUserChats);
router.get("/find/:userId/:recipientId", getSingleChat);
router.put("/:userId/:chatId", deleteSingleChat);

module.exports = router;
