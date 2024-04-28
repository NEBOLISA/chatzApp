const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  findUser,
  getUsers,
  updateUser,
} = require("../Controller/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:userId", findUser);
router.get("/", getUsers);
router.put("/", updateUser);

module.exports = router;
