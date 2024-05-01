const express = require("express");
const { upload } = require("../upload");
const {
  postImage,
  getUserProfilePic,
  getAllPics,
  updatePicture,
} = require("../Controller/imageController");

const router = express.Router();

router.post("/", upload.single("image"), postImage);
router.get("/:userId", getUserProfilePic);
router.get("/", getAllPics);
router.post("/:userId", upload.single("image"), updatePicture);

module.exports = router;
