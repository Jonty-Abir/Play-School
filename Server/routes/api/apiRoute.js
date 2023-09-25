const express = require("express");
const { carouselController } = require("../../controller/api/apiCarouselController");
const { register } = require("../../controller/api/apiSignUpController");
const { login } = require("../../controller/api/apiLoginController");
const tokenController = require("../../controller/api/apiTokenController");
const { facilitiesController } = require("../../controller/api/apiFacilities.controller");
const { classesController } = require("../../controller/api/apiClassesController");
const { apiPopularTeacherController } = require("../../controller/api/apiPopularTeacher");

const apiRoutes = express.Router();

/*============== Carousel ================*/
apiRoutes.get("/carousel", carouselController.readAllCarousel); //GET ALL Carousel
// apiRoutes.get("/carousel/:id", carouselController.readAllCarousel);
/*============== Facilities ================*/
apiRoutes.get("/facilities", facilitiesController);//GET ALL Facilities 
/*============== classes ================*/
apiRoutes.get("/classes", classesController );//GET ALL classes
/*============== Login  ================*/
apiRoutes.post("/login", login);
/*============== Register ================*/
apiRoutes.post("/reg", register);
/*============== Token Verify ================*/
apiRoutes.get("/verify-token", tokenController);
/*==============  ================*/
apiRoutes.get("/popular-teachers", apiPopularTeacherController); // GET popularTeacher page


module.exports = { apiRoutes };
