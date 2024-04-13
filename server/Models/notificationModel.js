const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    senderId: String,
    receiverId: String,
    isRead: Boolean,
  },
  {
    timestamps: true,
  }
);

const notificationModel = mongoose.model("Notification", notificationSchema);

module.exports = notificationModel;
