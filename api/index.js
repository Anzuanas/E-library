const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser")
const bookRoute = require("./routes/book.js");
const authRoute = require("./routes/auth")


const cors = require("cors");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connection successfull");
  } catch (err) {
    console.log(err);
  }
}

connectDB();

app.use(cors())
app.use("/api/auth", authRoute);
app.use("/api/books", bookRoute);
app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
  }); 