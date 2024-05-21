const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");

const jwt = require("jsonwebtoken");

const generateToken = (_id) => {
  const jwtKey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ _id }, jwtKey, { expiresIn: "3d" });
};
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (user)
      return res.status(400).json({ message: `${user.email} alreadys exists` });
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });
    if (!validator.isEmail(email))
      return res
        .status(400)
        .json({ message: "The provided email is not valid" });
    if (!validator.isStrongPassword(password))
      return res
        .status(400)
        .json({ message: "Password must be a strong password" });

    user = new userModel({...req.body });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    const token = generateToken(user._id);
    res.status(200).json({
      _id: user._id,
      name,
      email,
      token,
      password,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password " });
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({login:false, message: "Wrong password" });
    } else {
      const accessToken = jwt.sign(
        { email: user.email, _id: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1m" }
      );
      const refreshToken = jwt.sign(
        { email: user.email, _id: user._id },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: "5m" }
      );
      return res
        .cookie("accessToken", accessToken, {
          maxAge: 60000,
          httpOnly: true,
        })
        .cookie("refreshToken", refreshToken, {
          maxAge: 300000,
          httpOnly: true,
          secure: true,
          sameSite: true,
        })
        .status(200)
        .json({ login: true, _id: user._id, name: user.name, email, password,
          profilePic:user.profilePic });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
const findUser = async (req, res) => {
  const userId = req.params.userId;
  const user = await userModel.findById(userId);
  res.status(200).json(user);
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getUsers = async (req, res) => {
  const users = await userModel.find();
  res.status(200).json(users);
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
const updateUserName = async (req, res) => {
  try {
    const { userId, changedName } = req.body;
    const user = await userModel.findById(userId);
    user.name = changedName;

    const response = await user.save();
    res.status(200).json({ data: response, status: 200 });
  } catch (error) {
    console.error("Error updating user name:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const updateUserPicture = async (req, res) => {
  try {
    const {  userPicture } = req.body;
    const {userId} = req.params
    const user = await userModel.findById(userId);
    user.profilePic = userPicture;

    const response = await user.save();
    res.status(200).json({ data: response,message:"Image successfully uploaded", status: 200 });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { registerUser, loginUser, findUser, getUsers, updateUserName,updateUserPicture };
