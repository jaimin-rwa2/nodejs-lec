const express = require("express");
const cors = require("cors");
const userRoutes = require("./src/routes/users");
const blogRoutes = require("./src/routes/blog");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

app.listen(PORT, async () => {
  await mongoose.connect("mongodb://localhost:27017/node-05");
  console.log("DB connected");
  console.log(`server is running on http://localhost:${PORT}`);
});
