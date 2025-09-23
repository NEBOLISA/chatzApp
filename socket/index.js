const { Server } = require("socket.io");
require("dotenv").config();
const port = process.env.PORT || 3000;
const io = new Server({
  cors: 'https://chatzapp-2.onrender.com'
})
// const io = new Server({
//   cors: "http://localhost:5173/",
// });
let onlineUsers = [];
io.on("connection", (socket) => {
  socket.on("addNewUser", (userId) => {
    if (userId === null) return;
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });

    io.emit("getOnlineUsers", onlineUsers);
  });
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );
    if (user) io.to(user.socketId).emit("getMessage", message);
    if (user)
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        receiverId: message.recipientId,
        isRead: false,
        date: new Date(),
      });
  });
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});
io.listen(port);
