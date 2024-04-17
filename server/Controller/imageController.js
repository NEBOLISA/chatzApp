const expressHandler = require("express-async-handler");
const imageSchema = require("../Models/imageModel");

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
module.exports = { postImage };
