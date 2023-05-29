const { OAuth2Client } = require("google-auth-library");

const User = require("../models/user");
const { validateUser, generateToken } = require("../config/helper");
const { GOOGLE_CLEINT_ID, GOOGLE_CLIENT_SECRET } = require("../config/config");
const { ConflictError } = require("../errors/errors");

const oAuth2Client = new OAuth2Client(GOOGLE_CLEINT_ID, GOOGLE_CLIENT_SECRET);

const verifyGoogleLogin = async (token) => {
  const ticket = await oAuth2Client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLEINT_ID,
  });

  return ticket.getPayload();
};

const createUser = async ({
  firstname,
  lastname,
  username,
  email,
  authProvider,
  profileImage,
}) => {
  const findUser = await User.findOne({ username });
  if (findUser) throw new ConflictError("This username already exist!");
  return await User.create({
    firstname,
    lastname,
    username,
    email,
    authProvider,
    profileImage,
  });
};

const googleAuth = async (req, res) => {
  const { token, username } = req.body;
  const authUser = await verifyGoogleLogin(token);

  let user = await User.findOne({
    email: authUser.email,
    authProvider: "google",
  });
  if (!user) {
    user = await createUser({
      firstname: authUser.name,
      lastname: authUser.family_name,
      username,
      email: authUser.email,
      authProvider: "google",
      profileImage: authUser.picture,
    });
  }
  user = user.toJSON();
  delete user.password;

  const tokenObj = await generateToken({ id: user.id });
  res.cookie("jwt_token", token).status(201).json({
    msg: "Authentication successful!",
    token: tokenObj,
    user,
  });
};

async function loginUser(req, res) {
  const { identity, password } = req.body;
  const user = await validateUser(identity, password);
  if (!user) {
    return res.status(401).json("Invalid Credentials");
  }
  const token = await generateToken({ id: user.id });
  const data = user.toJSON();
  delete data.password;
  res.cookie("jwt_token", token).json({
    msg: "Login successful!",
    token,
    data,
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
  checkAuth,
  googleAuth
};
