const express = require("express");
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const userController = require("./routes/userRouter");

dotenv.config({ path: './src/.env' });
const PORT = process.env.SERVER_PORT || 8080;

mongoose.connect(process.env.MONGODB_URI).then(() => console.log('DB connection successfully!'));
app.use(express.json())
app.use("/api/users", userController)
app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  // mongoConnect()
  //   .then((res) => console.log(`Connect to MongoDB success!`))
  //   .catch((err) => {
  //       throw new Error(`An error occurs! Error :${err}`)});
});