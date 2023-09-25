const express = require("express");
const { homeController } = require("../../controller/user/homeController");

const homeRoute = express.Router();

homeRoute.get("/", homeController.home);

module.exports = { homeRoute };
