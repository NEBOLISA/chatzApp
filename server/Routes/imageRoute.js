const express = require("express");
const { upload } = require("../upload");
const {
  postImage,
  getUserProfilePic,
  getAllPics,
} = require("../Controller/imageController");

const router = express.Router();

router.post("/", upload.single("image"), postImage);
router.get("/:userId", getUserProfilePic);
router.get("/", getAllPics);

module.exports = router;
