const notificationModel = require("../Models/notificationModel");

const createNotification = async (req, res) => {
  const { senderId, receiverId, isRead } = req.body;
  try {
    const notification = new notificationModel({
      senderId,
      receiverId,
      isRead,
    });
    const response = await notification.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUserNotifications = async (req, res) => {
  const { receiverId } = req.params;
  try {
    const userNotifications = await notificationModel.find({ receiverId });
    res.status(200).json(userNotifications);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateNotification = async (req, res) => {
  const { senderId, isRead } = req.body;
  try {
    const singleUserNotifications = await notificationModel.find({
      senderId,
      isRead: false,
    });
    singleUserNotifications.map(async (notification) => {
      notification.isRead = isRead;
      await notification.save();
    });
    res.status(200).json({ message: "Notifications updated successfully" });
  } catch (error) {
    console.error("Error updating user notifications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createNotification,
  getUserNotifications,
  updateNotification,
};
