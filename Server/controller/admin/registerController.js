const bcrypt = require("bcrypt");
const { UserModel } = require("../../model/admin/userSchema");
const { Validator } = require("node-input-validator");

class RegisterController {
  // GET Register Page
  async renderRegisterPage(req, res) {

    if (req.cookies && req.cookies["admin-token"]) {
      return res.redirect("/admin/dashboard");
    }
    try {
      res.render("admin/register", {
        error: "",
        title: "Register Page",
        value: "",
        url: req.url,
      });
    } catch (error) {
      res.render("admin/register", {
        error: "",
        title: "Register Page",
        value: "",
        url: req.url,
      });
    }
  }
  // ADD Carousel
  async register(req, res) {
    try {
      const payload = req.body;
      // console.log(payload);
      const v = new Validator(payload, {
        fullName: "required|string|minLength:3",
        email: "required|string|minLength:3",
        password: "required|string|minLength:5",
        cPassword: "required|string|minLength:5",
      });
      const matched = await v.check();
      if (!matched) {
        // console.log(v.errors);
        return res.render("admin/register", {
          error: v.errors,
          title: "Register Page",
          value: req.body,
          url: req.url,
        });
      }
      /*============== Check Email already Exist OR NOT ================*/

      const isEmail = await UserModel.findOne({ email: req.body.email });
      // console.log(isEmail);
      if (isEmail) {
        return res.render("admin/register", {
          error: {
            email: { message: "Email already exist.!" },
          },
          title: "Register Page",
          value: req.body,
          url: req.url,
        });
      }

      /*============== Check Both password word are same ================*/

      if (req.body.password !== req.body.cPassword) {
        return res.render("admin/register", {
          error: {
            password: { message: "both password not same!" },
            cPassword: { message: "both password not same!" },
          },
          title: "Register Page",
          value: req.body,
          url: req.url,
        });
      }
      // create has password
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      // save to DATA BASE
      const newUser = new UserModel({ ...req.body, password: hashPassword });
      await newUser.save();
      // console.log(newUser);
      // RESPONSE SEND TO THE CLIENT
      return res.redirect("/admin/login");
      // return res.render("admin/register", {
      //   error: "",
      //   title: "Register Page",
      //   value: req.body,
      // });
    } catch (error) {
      console.log(error?.message);
      return res.render("admin/register", {
        error,
        title: "Login Page",
        value: "",
        url: req.url,
      });
    }
  }
}

const registerController = new RegisterController();
module.exports = { registerController };
