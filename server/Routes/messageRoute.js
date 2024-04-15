const express = require("express");
const {
  createMessage,
  getUserMessages,
  getAllMessages,
} = require("../Controller/messageController");
const router = express.Router();

router.post("/", createMessage);
router.get("/:chatId", getUserMessages);
router.get("/", getAllMessages);

module.exports = router;
