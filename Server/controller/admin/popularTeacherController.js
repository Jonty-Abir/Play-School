const { Validator } = require("node-input-validator");
const {
  PopularTeacherModel,
} = require("../../model/admin/popularTeachersSchema");
const { destroyFile } = require("../../utility/deleteFile");
const { popularTeacherUpload } = require("../../utility/popularTeacher/popularTeacherUploads");

// render Popular teacher page
async function renderPopularTeacher(req, res) {
  try {
    const data = await PopularTeacherModel.find();
    res.render("admin/popularTeacher/index", {
      title: "Popular Teacher page",
      falshMsg: req.flash("info"),
      falshErr: req.flash("err"),
      falshDelete: req.flash("delete"),
      flashSwitch: req.flash("switch"),
      data,
      errors: "",
      payload: "",
      admin: req.admin,
      url: req.url,
    });
  } catch (error) {
    res.send(`<h2>Something went wrong try again...!</h2>`);
  }
}
// create ner popular teacher
async function createPopularTeacher(req, res) {
  const file = req.file;
  const payload = req.body;
  try {
    if (!req.file) {
      req.flash("err", "facilities Failed to added.");
      return res.render("admin/popularTeacher/index", {
        title: "Popular Teacher page",
        falshMsg: req.flash("info"),
        falshErr: req.flash("err"),
        falshDelete: req.flash("delete"),
        flashSwitch: req.flash("switch"),
        data: "",
        errors: {
          avatar: {
            message: "The Avatar  field is mandatory.",
            rule: "required",
          },
        },
        payload: payload,
        admin: req.admin,
        url: req.url,
      });
    }
    // console.log(payload);
    const v = new Validator(payload, {
      fullName: "required|string",
      designation: "required|string|minLength:2",
      fbLink: "required|string",
      instagramLink: "required|string",
      twitterLink: "required|string",
    });
    const matched = await v.check();
    if (!matched) {
      // console.log(v.errors);
      return res.render("admin/popularTeacher/index", {
        title: "Popular Teacher page",
        falshMsg: req.flash("info"),
        falshErr: req.flash("err"),
        falshDelete: req.flash("delete"),
        flashSwitch: req.flash("switch"),
        data: "",
        errors: v.errors,
        payload: payload,
        admin: req.admin,
        url: req.url,
      });
    }
    const model = PopularTeacherModel({
      ...payload,
      socialAccount: {
        facebookLink: payload?.fbLink,
        instagramLink: payload?.instagramLink,
        twitterLink: payload?.twitterLink,
      },
      avatar: file.filename,
    });
    //  Save to DB
    await model.save();
    // console.log(model);
    req.flash("info", "New Facilities has Successfully added.");
    return res.redirect("/admin/popular-teachers");
  } catch (error) {
    req.flash("err", "Facilities Failed to added.");
    console.log(error);
    destroyFile(`${__dirname}/../../uploads/popularTeacher/${req.file.filename}`);
    return res.redirect("/admin/popular-teachers");
  }
}
// DELETE PopularTeacher
async function deletePopularTeacher(req, res) {
  try {
    if (!req.params.id) throw new Error();
    const result = await PopularTeacherModel.findByIdAndDelete(
      req.params.id
    );
    const imgPath = result?.avatar?.split("/")?.slice(-1)[0];
    destroyFile(`${__dirname}/../../uploads/popularTeacher/${imgPath}`);
    req.flash("delete", "Facilities has Successfully Removed.");
    return res.redirect("/admin/popular-teachers");
  } catch (error) {
    console.log(error);
    req.flash("err", "Failed Try Again...!");
    return res.redirect("/admin/popular-teachers");
  }
}
// switch PopularTeacher
async function switchPopularTeacher(req, res) {
  try {
    if (!req.params.id) throw new Error();
    const prevValue = await PopularTeacherModel.findById(req.params.id);
    await PopularTeacherModel.findByIdAndUpdate(req.params.id, {
      active: !prevValue.active,
    });
    req.flash("switch", "Success.");
    return res.redirect("/admin/popular-teachers");
  } catch (error) {
    console.log(error);
    req.flash("switch", "Failed!");
    return res.redirect("/admin/popular-teachers");
  }
}

module.exports = { renderPopularTeacher, createPopularTeacher, switchPopularTeacher, deletePopularTeacher };
