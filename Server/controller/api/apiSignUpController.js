const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const niv = require("node-input-validator");
const mongoose = require("mongoose");
const { UserModel } = require("../../model/admin/userSchema");

async function register(req, res) {
  const payload = req.body;

  try {
    /*============== Check Email Address Exist  ================*/

    niv.extend("unique", async ({ value, args }) => {
      // default field is email in this example
      const field = args[1] || "email";

      let condition = {};

      condition[field] = value;

      let emailExist = await mongoose.model(args[0]).findOne(condition);

      // email already exists
      if (emailExist) {
        return false;
      }
      return true;
    });

    /*============== Check Valid Mobile NO  ================*/

    niv.extendMessages(
      {
        validNo: "Invalid mobile No..!",
      },
      "en"
    );

    niv.extend("validNo", async ({ value }) => {
      // email already exists
      if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(value)) {
        return false;
      }
      return true;
    });

    const rules = {
      fullName: "required|string|minLength:3",
      email: "required|email|unique:User,email",
      mobileNo: "required|string|validNo",
      password: "required|string|minLength:6",
      cPassword: "required|string|minLength:6",
    };
    const v = new niv.Validator(payload, rules);
    const matched = await v.check();

    if (!matched) {
      // console.log(v.errors);
      return res.status(StatusCodes.BAD_REQUEST).json({ error: v.errors });
    }
    /*============== Check Both password word are same ================*/

    if (payload.password !== payload.cPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: {
          cPassword: { message: "both password not same!" },
        },
        message: "Bad request",
      });
    }
    // create has password
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const model = new UserModel({ ...req.body, password: hashPassword });
    // Save to DB
    await model.save();
    return res.status(StatusCodes.CREATED).json({ message: "success", status: StatusCodes.CREATED, model });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server Error.!",
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error,
    });
  }
}
module.exports = { register };
