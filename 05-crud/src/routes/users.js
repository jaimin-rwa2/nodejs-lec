const express = require("express");
const {
  getUser,
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controlers/users");

const userRoutes = express.Router();

userRoutes.get("/", getUsers);

userRoutes.get("/:user_id", getUser);

userRoutes.post("/", registerUser);

userRoutes.put("/:user_id", updateUser);

userRoutes.delete("/:user_id", deleteUser);

userRoutes.post("/login", loginUser);

module.exports = userRoutes;
