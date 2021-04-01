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
  console.log('----made it to login --------')
  user = await User.findOne({ email: req.body.email });
  console.log(user.toJSON())
  if (!user) {
    return res.status(404).json({ message: "Not Authorized - Username invalid" });
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).json({ message: "Not Authorized - Incorrect Password" });
  }

  const tokeni = jwt.sign(
    { _id: user.id, name: user.name, email: user.email },
    mySecret
  );

  res.cookie("jwt", tokeni, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

  const { password, ...data } = await user.toJSON();

  res.send(tokeni);
  next()
});

//Authenticate User
router.get("/user", async (req, res, next) => {
  
  try {
    console.log(`-------------MADE IT--------------`)
    const cookie = req.cookies["jwt"];
    console.log(`jwt is ${cookie}`)
    const claims = jwt.verify(cookie, mySecret);
    console.log(claims)
    if (!claims) {
      return res.status(401).send({ message: "Unauthenticated" });
    }

    const user = await User.findOne({ _id: claims._id }).select("-password");
    console.log(user)
    return res.json(user);
  } catch (err) {
    console.log(`-----------ERROR---------`)
    console.log(err)
    return res.status(401).send({ message: "Unauthenticated" });
  }
});

//Deauthenticate user
router.post("/logout", (req, res, next) => {
  res.cookie("jwt", " ", { maxAge: 0 });
  res.send({ message: "success" });
  next()
});

module.exports = router;
