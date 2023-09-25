const { Validator } = require("node-input-validator");
const { destroyFile } = require("../../utility/deleteFile");
const { FacilitiesModel } = require("../../model/admin/facilitiesSchema");

// GET Carouse Page
async function facilities(req, res) {
  try {
    const data = await FacilitiesModel.find();
    return res.render("admin/facilities/facilities", {
      title: "Facilities page",
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
// ADD facilities
async function createFacilities(req, res) {
  try {
    if (!req.file) {
      req.flash("err", "facilities Failed to added.");
      return res.redirect("/admin/facilities");
    }

    const file = req.file;
    const payload = req.body;

    const v = new Validator(payload, {
      title: "required|string",
      subTitle: "required|string",
    });
    const matched = await v.check();
    if (!matched) {
      return res.render("admin/facilities/facilities", {
        title: "Facilities page",
        falshMsg: req.flash("info"),
        falshErr: req.flash("err"),
        falshDelete: req.flash("delete"),
        flashSwitch: req.flash("switch"),
        data:"",
        payload: req?.body,
        errors: v?.errors,
        admin: req.admin,
        url: req.url,
      });
    }
    const facilitiesModel = FacilitiesModel({
      ...payload,
      image: file.filename,
    });
    await facilitiesModel.save();

    req.flash("info", "New Facilities has Successfully added.");
    return res.redirect("/admin/facilities");
  } catch (error) {
    req.flash("err", "Facilities Failed to added.");
    console.log(error);
    destroyFile(`${__dirname}/../../uploads/facilities/${req.file.filename}`);
    return res.redirect("/admin/facilities");
  }
}
// DELETE facilities
async function deleteFacilities(req, res) {
  try {
    if (!req.params.id) throw new Error();
    const deleteFacilities = await FacilitiesModel.findByIdAndDelete(
      req.params.id
    );
    const imgPath = deleteFacilities.image.split("/").slice(-1)[0];
    destroyFile(`${__dirname}/../../uploads/facilities/${imgPath}`);
    req.flash("delete", "Facilities has Successfully Removed.");
    return res.redirect("/admin/facilities");
  } catch (error) {
    console.log(error);
    req.flash("err", "Failed Try Again...!");
    return res.redirect("/admin/facilities");
  }
}
// switch facilities
async function switchFacilities(req, res) {
  try {
    if (!req.params.id) throw new Error();
    const prevValue = await FacilitiesModel.findById(req.params.id);
    await FacilitiesModel.findByIdAndUpdate(req.params.id, {
      active: !prevValue.active,
    });
    req.flash("switch", "Success.");
    return res.redirect("/admin/facilities");
  } catch (error) {
    console.log(error);
    req.flash("switch", "Failed!");
    return res.redirect("/admin/facilities");
  }
}

module.exports = {
  switchFacilities,
  deleteFacilities,
  createFacilities,
  facilities,
};
