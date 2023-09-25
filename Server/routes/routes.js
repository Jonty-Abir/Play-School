const { adminRoute } = require("./admin/adminRoute");
const { apiRoutes } = require("./api/apiRoute");
const { homeRoute } = require("./user/homeRoute");
const express = require("express");

const routes = express.Router();

const defaultRouter = [
  {
    path: "/admin",
    route: adminRoute,
  },
  {
    path: "/",
    route: homeRoute,
  },
  {
    path: "/api",
    route: apiRoutes,
  },
];

defaultRouter.forEach((route) => {
  routes.use(route.path, route.route);
});

module.exports = { routes };
