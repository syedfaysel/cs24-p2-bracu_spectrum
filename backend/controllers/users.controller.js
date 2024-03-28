const User = require("../models/user.model");

const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      next({ message: "Please provide username, email and password" })
    }
    const userExists = await User.findOne({ $or: [{ username }, { email }] });

    if (userExists) {
      next({ message: `User already exists with ${userExists.username===username ? useraname : email}`})
    }
    const user = await User.create({ username, email, password });
    user.password = undefined;
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the User.",
    });
  }
};

//get all users (system admin access)
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").populate({
      path: "role",
      select: "title",
      populate: {
        path: "permissions",
        select: "label",
      }
    });
    res.status(201).send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the User.",
    });
  }
};

const getUserById = async (req, res, next) => {
  try {
    const _id = req.params.userId;
    const user = await User.findById(_id).select("-password").populate({
      path: "role",
    })
  } catch (error) {
    
  }
}

module.exports = {
  createUser,
  getUsers,
};
