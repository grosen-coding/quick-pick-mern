import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";

// Sign UP ---------
const signUp = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;

    const checkUser = await userModel.findOne({ username });

    if (checkUser)
      return responseHandler.badRequest(
        res,
        "Sorry, username has already been used. Please try another."
      );

    const user = new userModel();

    user.displayName = displayName;
    user.username = username;
    user.setPassword(password);

    await user.save();

    const token = jsonwebtoken.sign({ data: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    responseHandler.error(res);
  }
};

// Sign IN -----------
const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel
      .findOne({ username })
      .select("username password salt id displayName");

    if (!user)
      return responseHandler.badRequest(res, "Sorry, user does not exist");

    if (!user.validPassword(password))
      return responseHandler.badRequest(
        res,
        "Seems like the incorrect password, please try again."
      );

    const token = jsonwebtoken.sign({ data: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    user.password = undefined;
    user.salt = undefined;

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    responseHandler.error(res);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const user = await userModel
      .findById(req.user.id)
      .select("password id salt");

    if (!user) return responseHandler.unauthorize(res);

    if (!user.validPassword(password))
      return responseHandler.badRequest(
        res,
        "Sorry, that password does not match"
      );

    user.setPassword(newPassword);

    await user.save();

    responseHandler.everythingOk(res);
  } catch {
    responseHandler.error(res);
  }
};

const getInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) return responseHandler.notFound(res);

    responseHandler.everythingOk(res, user);
  } catch {
    responseHandler.error(res);
  }
};

export default {
  signUp,
  signIn,
  getInfo,
  updatePassword,
};
