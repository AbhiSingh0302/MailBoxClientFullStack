const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");
const userRouter = require("./routes/users");
const emailRouter = require("./routes/email");

const app = express();

app.use(cors());

app.use(express.json());

require("dotenv").config();

// Connect to DB
connectDB();

app.use(userRouter);

app.use(emailRouter);

app.listen(4000, (data) => {
    console.log("backend is running at 4000");
})