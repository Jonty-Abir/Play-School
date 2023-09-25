class HomeController {
  async home(req, res) {
    try {
      res.render("user/home", {
        title: "home page",
        result: "data",
      });
    } catch (error) {
      res.send("error");
    }
  }
}

const homeController = new HomeController();
module.exports = { homeController };
