require("dotenv").config()
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const port = 8000
//middleware
app.use(cookieParser());
app.use(cors())
app.use(express.json());

 /////////////////////////////////////////////////
 ///// Register and Config Routes ///////////////
 ///////////////////////////////////////////////
 const header =       express.Router()

//import routes
require('./routes/header')(header)
const userRoutes = require("./routes/user");

mongoose.connect(
  "mongodb://localhost:27017/nodeauth",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("mongodb connected");
  }
);
//routes
app.use(header);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("home");
});

app.listen(port, () => console.log(`Server running on Port ${port}`))
