const express = require("express");
const {
  createMessage,
  getUserMessages,
} = require("../Controller/messageController");
const router = express.Router();

router.post("/", createMessage);
router.get("/:chatId", getUserMessages);

module.exports = router;
