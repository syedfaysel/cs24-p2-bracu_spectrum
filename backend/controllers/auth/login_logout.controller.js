const User = require("../../models/user.model");

// login controller ... //
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }

    // can alternatively use user.comparePassword
    const auth = await user.comparePassword(password);
    console.log(auth);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    //after that create a token & send response
    user.password = undefined; // for security purpose
    const token = user.createJWT();
    const resUser = await user.populate({
      path: "roles",
      populate: {
        path: "permissions",
      }
    });
    res.cookie("token", token, {
      sameSite: "lax",
      withCredentials: true,
      httpOnly: true,
    });
    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user: resUser,
      token,
    });
    next();
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    return res.status(200).clearCookie('token').json({success: true, message: "User logged out successfully" });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({sucess: false, message: "Login failed", error: error.message});
  }
}

module.exports = {
  login,
  logout,
};
