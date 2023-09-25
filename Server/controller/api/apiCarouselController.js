const {StatusCodes}= require("http-status-codes");
const { CarouselModel } = require("../../model/admin/carousel.schema");

class CarouselController {
  async readAllCarousel(req, res) {
    try {
      const result = await CarouselModel.find({ active: true });
      return res.status(StatusCodes.OK).json({ msg: "success", result });
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error?.message });
    }
  }
}

const carouselController = new CarouselController();
module.exports = { carouselController };
