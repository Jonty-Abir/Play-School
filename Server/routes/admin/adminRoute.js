const express = require("express");
const { upload } = require("../../utility/carousel/fileUpload");
const {facilitiesUpload,} = require("../../utility/facilities/facilitiesUploads");
const {popularTeacherUpload,} = require("../../utility/popularTeacher/popularTeacherUploads");
const { classesUpload } = require("../../utility/classes/classesUploads");

const {dashboardController,} = require("../../controller/admin/dashboardController");
const {carouselController,} = require("../../controller/admin/carouselController");
const { loginController } = require("../../controller/admin/loginController");
const {registerController,} = require("../../controller/admin/registerController");
const { isAdmin } = require("../../middleware/auth/authAdminMiddleware");
const {switchFacilities,deleteFacilities,createFacilities,facilities,} = require("../../controller/admin/facilitiesController");
const {createClasses,deleteClasses,switchClasses, classes,} = require("../../controller/admin/classesController");
const { renderPopularTeacher, createPopularTeacher, deletePopularTeacher, switchPopularTeacher } = require("../../controller/admin/popularTeacherController");

const adminRoute = express.Router();

// GET Admin DASHBOARD PAGE

/*=================== Admin Login =========================*/

adminRoute.get("/login", loginController.renderLoginPage);
adminRoute.post("/login", loginController.login);

/*============== Admin Register ================*/

adminRoute.get("/register", registerController.renderRegisterPage);
adminRoute.post("/register", registerController.register);

/*============== Dashboard ================*/

adminRoute.get("/dashboard", isAdmin, dashboardController.dashboard); //

/*============== Carousel ================*/

adminRoute.get("/carousel", isAdmin, carouselController.carousel); // carousel page
adminRoute.get("/carousel/:id", isAdmin, carouselController.deleteCarousel); // DELETE Carousel
adminRoute.get("/carousel/switch/:id",isAdmin,carouselController.switchCarousel); // switch carousel
adminRoute.post("/addCarousel",isAdmin,upload.single("image"),carouselController.createCarousel); // Add carousel
// POST ADD Carousel

/*============== Facilities ================*/

adminRoute.get("/facilities", isAdmin, facilities); // GET facilities page
adminRoute.get("/facilities/:id", isAdmin, deleteFacilities); // DELETE facilities
adminRoute.get("/facilities/switch/:id", isAdmin, switchFacilities); // switch facilities
adminRoute.post("/facilities",isAdmin,facilitiesUpload.single("image"),createFacilities); // Add facilities

/*============== Classes ================*/

adminRoute.get("/classes", isAdmin, classes); // GET classes page
adminRoute.get("/classes/:id", isAdmin, deleteClasses); // DELETE classes
adminRoute.get("/classes/switch/:id", isAdmin, switchClasses); // switch classes
adminRoute.post("/classes",isAdmin,classesUpload.fields([
    { name: "poster", maxCount: 1 },
    { name: "avatar", maxCount: 1 },
]),createClasses); // Add classes

/*============== Popular Teacher ================*/

adminRoute.get("/popular-teachers", isAdmin, renderPopularTeacher); // GET popularTeacher page
adminRoute.get("/popular-teachers/:id", isAdmin, deletePopularTeacher); // DELETE popularTeacher
adminRoute.get("/popular-teachers/switch/:id", isAdmin, switchPopularTeacher); // switch popularTeacher
adminRoute.post("/popular-teachers",isAdmin, popularTeacherUpload.single("avatar"), createPopularTeacher); // Add popularTeacher

module.exports = { adminRoute };
