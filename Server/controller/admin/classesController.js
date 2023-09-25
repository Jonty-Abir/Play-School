const { Validator } = require("node-input-validator");
const { destroyFile } = require("../../utility/deleteFile");
const { ClassesModel } = require("../../model/admin/classesSchema");

/*============== GET classes Page ================*/

async function classes(req, res) {
  try {
    const data = await ClassesModel.find();
    res.render("admin/classes/classes", {
      title: "classes page",
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

/*============== ADD classes ================*/

async function createClasses(req, res) {
  const body = req?.body;
  const files = req?.files;

  try {
    if (!files["poster"] || !files["avatar"]) {
      // Delete time files
      if (files["poster"] || files["avatar"]) {
        files["poster"] &&
          destroyFile(`${__dirname}/../../uploads/classes/${req?.files?.poster[0]?.filename}`);
        files["avatar"] &&
          destroyFile(`${__dirname}/../../uploads/classes/${req?.files?.avatar[0]?.filename}`);
      }
      req.flash("err", "classes Failed to added.");

      return res.render("admin/classes/classes", {
        title: "classes page",
        falshMsg: req.flash("info"),
        falshErr: req.flash("err"),
        falshDelete: req.flash("delete"),
        flashSwitch: req.flash("switch"),
        data: "",
        payload: req?.body,
        admin: req.admin,
        url: req.url,
        errors: "",
      });
    }

    const payload = {
      tropicName: body?.tropicName,
      age: `${body?.first_age} ${body?.sce_age}`,
      classTime: `${body?.first_time} ${body?.sec_time}`,
      capacity: body?.capacity,
      teacher: {
        name: body?.name,
        fees: body?.fees,
      },
    };

    let posterFileName;
    let avatarFileName;

    if (files["poster"] || files["avatar"]) {
      if (files["poster"]) {
        posterFileName = req?.files?.poster[0]?.filename;
      }
      if (files["avatar"]) {
        avatarFileName = req?.files?.avatar[0]?.filename;
      }
    }

    const v = new Validator(payload, {
      tropicName: "required|string|minLength:4",
      age: "required|string",
      classTime: "required|string",
      capacity: "required|string",
      teacher: "required|object",
      "teacher.name": "required|string|minLength:3",
      "teacher.fees": "required|string",
    });
    const matched = await v.check();

    // Error Handaling
    if (!matched) {
      req.flash("err", "Classes Failed to added.");
      // Delete time files
      if (files["poster"] || files["avatar"]) {
        files["poster"] &&
          destroyFile(`${__dirname}/../../uploads/classes/${req?.files?.poster[0]?.filename}`);
        files["avatar"] &&
          destroyFile(`${__dirname}/../../uploads/classes/${req?.files?.avatar[0]?.filename}`);
      }

      return res.render("admin/classes/classes", {
        title: "classes page",
        falshMsg: req.flash("info"),
        falshErr: req.flash("err"),
        falshDelete: req.flash("delete"),
        flashSwitch: req.flash("switch"),
        data: "",
        payload: req?.body,
        admin: req.admin,
        errors: v?.errors,
        admin: req.admin,
        url: req.url,
      });
    }
    payload.teacher.avatar= avatarFileName;
    payload.poster=posterFileName;

    const classesModel = ClassesModel({ ...payload });
    
    classesModel.age = payload.age?.split(" ")?.join("-");
    classesModel.classTime = payload.classTime?.split(" ")?.join("-");

    await classesModel.save();

    req.flash("info", "New classes has Successfully added.");

    return res.redirect("/admin/classes");
  } catch (error) {
    req.flash("err", "Classes Failed to added.");
    console.log(error);
    // Delete time files
    if (files["poster"] || files["avatar"]) {
      files["poster"] &&
        destroyFile(`${__dirname}/../../uploads/classes/${req?.files?.poster[0]?.filename}`);
      files["avatar"] &&
        destroyFile(`${__dirname}/../../uploads/classes/${req?.files?.avatar[0]?.filename}`);
    }
    return res.redirect("/admin/classes");
  }
}

/*============== DELETE classes ================*/

async function deleteClasses(req, res) {
  try {
    if (!req.params.id) throw new Error();
    const deleteClasses = await ClassesModel.findByIdAndDelete(req.params.id);
    const posterPath = deleteClasses.poster?.split("/").slice(-1)[0];
    const avatarPath = deleteClasses?.teacher?.avatar?.split("/").slice(-1)[0];

    destroyFile(`${__dirname}/../../uploads/classes/${posterPath}`);
    destroyFile(`${__dirname}/../../uploads/classes/${avatarPath}`);

    req.flash("delete", "Classes has Successfully Removed.");
    return res.redirect("/admin/classes");
  } catch (error) {
    console.log(error);
    req.flash("err", "Failed Try Again...!");
    return res.redirect("/admin/classes");
  }
}

/*============== switch classes ================*/

async function switchClasses(req, res) {
  try {
    if (!req.params.id) throw new Error();
    const prevValue = await ClassesModel.findById(req.params.id);
    await ClassesModel.findByIdAndUpdate(req.params.id, {
      active: !prevValue.active,
    });
    req.flash("switch", "Success.");
    return res.redirect("/admin/classes");
  } catch (error) {
    console.log(error);
    req.flash("switch", "Failed!");
    return res.redirect("/admin/classes");
  }
}

module.exports = { createClasses, deleteClasses, switchClasses, classes };
