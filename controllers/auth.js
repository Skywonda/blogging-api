const userModel = require("../models/user");


const {
  validateUser,
  generateToken,
} = require("../config/helper");

async function loginUser(req, res) {
  const { identity, password } = req.body;
  const user = await validateUser(identity, password);
  if (!user) {
    return res.status(401).json("Invalid Credentials");
  }
  const token = await generateToken({ id: user.id });
  const data = user.toJSON()
  delete data.password
  res.cookie('jwt_token', token).json({
    msg: "Login successful!",
    token,
    data
  });
}

async function checkAuth(req, res) {
  res.json({
    msg: "You are authenticated",
    userId: req.user.id,
  });
}

module.exports = {
  loginUser,
  checkAuth
}