const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

//import secret from env
const mySecret = process.env.JWT_SECRET;

//Register new User
router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedpass = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedpass,
  });

  const newuser = await user.save();
  const { password, ...data } = await newuser.toJSON();

  res.send(data);
});

//Login User
router.post("/login", async (req, res, next) => {
 
  user = await User.findOne({ email: req.body.email });  
  if (!user) {
    return res.status(404).json({ message: "Not Authorized - Username invalid" });
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).json({ message: "Not Authorized - Incorrect Password" });
  }

  const token = jwt.sign(
    { _id: user.id, name: user.name, email: user.email },
    mySecret
  );

  const {_id, name, email} = await user.toJSON()  
  res.send({id: _id, name, email, token });
  next()
});

//Authenticate User
router.post("/verify", async (req, res, next) => {
  
  try {
    console.log(`----------VERIFY------`)
    const token = req.body.token
    console.log(`jwt is ${token}`)
    const claims = jwt.verify(token, mySecret);
    console.log(claims)
    if (!claims) {
      return res.status(401).send({ message: "Invalid Token - Not Authorized" });
    }    
    const user = await User.findOne({ _id: claims._id })
    if (!user) {
      return res.status(401).send({ message: "Token Valid but User Expired - Not Authorized" });
    }
    console.log(claims)
    return res.json(claims);
  } catch (err) {
    console.log(`-----------ERROR---------`)
    console.log(err)
    return res.status(401).send({ message: "Unauthenticated" });
  }
});

//token is removed on client side. 
router.post("/logout", (req, res, next) => {
  // the token is rmeoved from local storage client side
  res.send({ message: "success" });
  next()
});

module.exports = router;
