const { User } = require("../models/users");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  // ADMIN
  try {
    const allUsers = await User.find();

    res.status(200).json({
      users: allUsers,
    });
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
      error: error,
    });
  }
};

const getUser = async (req, res) => {
  // User it self,  ADMIN
  try {
    const user_id = req.params["user_id"]; // 3

    const singleUser = await User.findOne({ _id: user_id });

    if (!singleUser) {
      return res.status(404).json({
        msg: "this user is dose not exist",
      });
    } else {
      return res.status(200).json({
        user: singleUser,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "internal server error",
      error: error,
    });
  }
};

const registerUser = async (req, res) => {
  // ANY
  try {
    const { username, password, ...userData } = req.body;

    await User.create({ username: username, password: password });

    res.status(201).json({
      msg: "user added",
    });
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
      error: error,
    });
  }
};

const updateUser = async (req, res) => {
  // User Self, ADMIN
  try {
    const user_id = req.params["user_id"]; // 3
    const user_data = req.body;
    const singleUser = await User.findOne({ _id: user_id });

    if (!singleUser) {
      return res.json({
        msg: "this user is dose not exist",
      });
    } else {
      if (user_data["username"]) {
        singleUser["username"] = user_data["username"];
      }

      if (user_data["age"]) {
        singleUser["age"] = user_data["age"];
      }

      if (user_data["password"]) {
        singleUser["password"] = user_data["password"];
      }

      singleUser.save();
      // mongo db will not chage without this

      return res.status(202).json({
        msg: "user updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
      error: error,
    });
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  // User self, ADMIN
  try {
    const user_id = req.params["user_id"]; // 3

    const singleUser = await User.findById(user_id);

    if (!singleUser) {
      return res.json({
        msg: "this user is dose not exist",
      });
    } else {
      await User.deleteOne({ _id: user_id });

      return res.status(202).json({
        msg: "user removed",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
      error: error,
    });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username) return res.json({ msg: "please enter username" });

  if (!password) return res.json({ msg: "please enter password" });

  const user = await User.findOne({ username });

  if (!user) return res.json({ msg: "User not found" });

  if (user.password !== password) return res.json({ msg: "Password is wrong" });

  // auth token : asd3980asdhf40wrusdf45sdfhge45ytfdh45yrfhy5y
  const token = jwt.sign(
    { data: user._id, user: user.username },
    "privateKey",
    { expiresIn: "1m" }
  );

  res.json({
    token: token,
    msg: "User Logged in successfuly",
  });
};

module.exports = {
  getUser,
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
};
