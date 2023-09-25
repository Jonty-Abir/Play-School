class DashboardController {
  // GET Dashboard Page
  async dashboard(req, res) {
    try {
      res.render("admin/admindashboard", {
        title: "home page",
        admin: req.admin,
        url: req.url,
      });
    } catch (error) {
      res.send("something went wrong!");
    }
  }
}

const dashboardController = new DashboardController();
module.exports = { dashboardController };
