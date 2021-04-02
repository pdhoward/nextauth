require("dotenv").config()
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 8000
 
 /////////////////////////////////////////////
 /////////  Middleware        ///////////////
 ///////////////////////////////////////////

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 /////////////////////////////////////////////////
 /////////         Database       ///////////////
 ///////////////////////////////////////////////
mongoose.connect(
  "mongodb://localhost:27017/nodeauth",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    console.log(err ||"mongodb connected");
  }
);

 /////////////////////////////////////////////////
 ////////// Register and Config Routes //////////
 ///////////////////////////////////////////////
 const header =       express.Router()

//import routes
require('./routes/header')(header)
const usersRoutes = require('./routes')

 /////////////////////////////////////////////////
 //////////       API Catalogue       ///////////
 ///////////////////////////////////////////////

app.use(header)
app.use("/api/users", userRoutes)

app.listen(port, (err) => console.log(err || `Server running on Port ${port}`))
