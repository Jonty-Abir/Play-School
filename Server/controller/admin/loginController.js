const { UserEnum } = require("../../utility/enum");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Validator } = require("node-input-validator");
const { CarouselModel } = require("../../model/admin/carousel.schema");
const { UserModel } = require("../../model/admin/userSchema");

class LoginController {
  // GET Dashboard Page
  async renderLoginPage(req, res) {

    if (req.cookies && req.cookies["admin-token"]) {
      return res.redirect("/admin/dashboard");
    }
    try {
      res.render("admin/login", {
        title: "home page",
        value: "",
        error: "",
        url: req.url,
      });
    } catch (error) {
      res.render("admin/login", {
        title: "home page",
        value: "",
        error: "",
        url: req.url,
      });
    }
  }
  // ADD Carousel
  async login(req, res) {
    try {
      const payload = req.body;
      // console.log(payload);
      const v = new Validator(payload, {
        email: "required|email",
        password: "required|string",
      });
      const matched = await v.check();
      if (!matched) {
        // console.log(v.errors);
        return res.render("admin/login", {
          error: v.errors,
          title: "Login Page",
          value: req.body,
          url: req.url,
        });
      }

      /*============== Check Valid Password ================*/

      const validUser = await UserModel.findOne({
        email: req.body.email,
        role: UserEnum.admin,
      });
      if (!validUser) throw new Error("unauthorized! Try again..!");
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        validUser.password
      );
      if (!isValidPassword) throw new Error("unauthorized! Try again..!");

      /*============== SET Cookies & Sign The JWT Token ================*/

      const tokenPayload = {
        id: validUser._id,
        role: validUser.role,
        avatar: validUser.avatar,
        fullName: validUser.fullName,
        createdAt: validUser.createdAt,
        updatedAt: validUser.updatedAt,
      };
      const token = jwt.sign(tokenPayload, process.env.ADMIN_TOKEN_SECRET, {
        expiresIn: "24h",
      });
      // console.log(token);
      res.cookie("admin-token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 2, // 2Days
        httpOnly: true,
      });
      // REDIRECT TO PROTECT PAGE
      res.redirect("/admin/dashboard");
      // return res.render("admin/login", {
      //   error: "",
      //   title: "Login Page",
      //   value: req.body,
      // });
    } catch (error) {
      console.log(error?.message);
      return res.render("admin/login", {
        error: { message: error?.message },
        title: "Login Page",
        value: req.body,
        url: req.url,
      });
    }
  }
}

const loginController = new LoginController();
module.exports = { loginController };
