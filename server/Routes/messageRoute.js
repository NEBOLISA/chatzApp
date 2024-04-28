const express = require("express");
const {
  createMessage,
  getUserMessages,
} = require("../Controller/messageController");
const router = express.Router();

router.post("/", createMessage);
router.get("/:senderId/:receiverId/:userId", getUserMessages);

module.exports = router;
