const imageSchema = require("../Models/imageModel");
const fs = require("fs");
const postImage = async (req, res) => {
  const userId = req.body.userId;
  try {
    if (!req.file) {
      res.status(500).json({ error: "No file found" });
    }

    const imageFile = imageSchema({
      fileName: req.file.filename,
      filePath: req.file.path,
      userId,
    });
    const savedImage = await imageFile.save();
    res.status(200).json(savedImage);
  } catch (error) {
    console.log(error);
  }
};

const getUserProfilePic = async (req, res) => {
  const { userId } = req.params;
  try {
    const profilePic = await imageSchema.findOne({ userId });
    res.status(200).json(profilePic);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getAllPics = async (req, res) => {
  const pictures = await imageSchema.find();
  res.status(200).json(pictures);
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
const updatePicture = async (req, res) => {
  const userId = req.params.userId;

  try {
    if (!req.file) {
      res.status(500).json({ error: "No file found" });
    }
    const imageDocument = await imageSchema.findOne({ userId });

    if (imageDocument) {
      try {
        if (imageDocument.filePath) {
          fs.unlinkSync(imageDocument.filePath);
        }
      } catch (unlinkError) {
        console.error("Error deleting previous image file:", unlinkError);
        return res.status(500).json("Failed to delete previous image file");
      }
      imageDocument.fileName = req.file.filename;
      imageDocument.filePath = req.file.path;
      const updatedImage = await imageDocument.save();
      res
        .status(200)
        .json({ data: updatedImage, message: "Image successfully Updated" });
    } else {
      const imageFile = imageSchema({
        fileName: req.file.filename,
        filePath: req.file.path,
        userId,
      });
      const newUpload = await imageFile.save();
      res
        .status(200)
        .json({ data: newUpload, message: "Image successfully Uploaded" });
    }
  } catch (error) {
    res.status(500).json(err);
  }
};
module.exports = { postImage, getUserProfilePic, getAllPics, updatePicture };
