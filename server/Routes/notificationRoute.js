const express = require("express");
const router = express.Router();
const {
  createNotification,
  getUserNotifications,
  updateNotification,
} = require("../Controller/notificationController");

router.post("/", createNotification);
router.get("/:receiverId", getUserNotifications);
router.put("/", updateNotification);

module.exports = router;
