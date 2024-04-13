const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");
const notificationRoute = require("./Routes/notificationRoute");

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
app.use("/api/notifications", notificationRoute);
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb connection established"))
  .catch((err) => console.log("Mongodb connection failed: ", err.message));
