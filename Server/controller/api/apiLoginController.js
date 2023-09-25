const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const niv = require("node-input-validator");
const mongoose = require("mongoose");
const { UserModel } = require("../../model/admin/userSchema");
const { LoginDTO } = require("../../DTO/userDto");

async function login(req, res) {
  const payload = req.body;

  try {
    const rules = {
      email: "required|email",
      password: "required|string",
    };
    const v = new niv.Validator(payload, rules);
    const matched = await v.check();

    if (!matched) {
      // console.log(v.errors);
      return res.status(StatusCodes.BAD_REQUEST).json({ error: v.errors });
    }

    /*============== User Exist Or Not ================*/

    const user = await UserModel.findOne({
      email: payload.email,
      role: "User",
    });

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: {
          errorMsg: "UNAUTHORIZED... try again .!",
        },
        message: "Bad request",
      });
    }
    // create has password

    const validPw = await bcrypt.compare(payload.password, user.password);

    if (!validPw) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: {
          errorMsg: "UNAUTHORIZED... try again .!",
        },
        message: "Bad request",
      });
    }
    // sing Token
    const tokenPayload = {
      id: user._id,
      fullName: user.fullName,
      role: user.role,
      avatar: user.avatar,
    };

    const token = jwt.sign(tokenPayload, process.env.USER_TOKEN_SECRET, {
      expiresIn: "24h",
    });
    res.cookie("user-token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 2,
    });
    return res
      .status(StatusCodes.OK)
      .json({ message: "success", status: StatusCodes.OK, token, user: new LoginDTO(user) });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server Error.!",
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error,
    });
  }
}
module.exports = { login };
