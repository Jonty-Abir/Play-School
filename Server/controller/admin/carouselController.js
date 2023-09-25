const { Validator } = require("node-input-validator");
const { destroyFile } = require("../../utility/deleteFile");
const { CarouselModel } = require("../../model/admin/carousel.schema");

class CarouselController {
  // GET Carouse Page
  async carousel(req, res) {
    try {
      const data = await CarouselModel.find();
      return res.render("admin/carousel/carousel", {
        title: "banner page",
        falshMsg: req.flash("info"),
        falshErr: req.flash("err"),
        falshDelete: req.flash("delete"),
        flashSwitch: req.flash("switch"),
        data,
        payload: "",
        errors: "",
        admin: req.admin,
        url: req.url,
      });
    } catch (error) {
      return res.send(`<h2>Something went wrong try again...!</h2>`);
    }
  }
  // ADD Carousel
  async createCarousel(req, res) {
    try {
      if (!req.file) {
        req.flash("err", "Carousel Faild to added.");
        return res.redirect("/admin/carousel");
      }

      const file = req.file;
      const payload = req.body;

      const v = new Validator(payload, {
        title: "required",
        subTitle: "required",
      });
      const matched = await v.check();
      if (!matched) {
        return res.render("admin/carousel/carousel", {
          title: "banner page",
          falshMsg: req.flash("info"),
          falshErr: req.flash("err"),
          falshDelete: req.flash("delete"),
          flashSwitch: req.flash("switch"),
          data: "",
          payload: req?.body,
          errors: v.errors,
          admin: req.admin,
          url: req.url,
        });
      }
      const newCarouselModel = CarouselModel({
        ...payload,
        image: file.filename,
      });
      await newCarouselModel.save();
      req.flash("info", "Carousel Successfully added.");
      return res.redirect("/admin/carousel");
    } catch (error) {
      req.flash("err", "Carousel Faild to added.");
      console.log(error);
      destroyFile(`${__dirname}/../../uploads/carousel/${req.file.filename}`);
      return res.redirect("/admin/carousel");
    }
  }
  // DELETE Carousel
  async deleteCarousel(req, res) {
    try {
      if (!req.params.id) throw new Error();
      const deletedCarousel = await CarouselModel.findByIdAndDelete(
        req.params.id
      );
      const imgPath = deletedCarousel.image.split("/").slice(-1)[0];
      destroyFile(`${__dirname}/../../uploads/carousel/${imgPath}`);
      req.flash("delete", "Carousel Successfully Removed.");
      return res.redirect("/admin/carousel");
    } catch (error) {
      console.log(error);
      req.flash("err", "Failed Try Again...!");
      return res.redirect("/admin/carousel");
    }
  }
  // switch carousel
  async switchCarousel(req, res) {
    try {
      if (!req.params.id) throw new Error();
      const prevValue = await CarouselModel.findById(req.params.id);
      await CarouselModel.findByIdAndUpdate(req.params.id, {
        active: !prevValue.active,
      });
      req.flash("switch", "Success.");
      return res.redirect("/admin/carousel");
    } catch (error) {
      console.log(error);
      req.flash("switch", "Failed!");
      return res.redirect("/admin/carousel");
    }
  }
}

const carouselController = new CarouselController();
module.exports = { carouselController };
