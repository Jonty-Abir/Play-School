const { FacilitiesModel } = require("../../model/admin/facilitiesSchema");
const {StatusCodes}= require("http-status-codes");

async function facilitiesController(req, res) {
  try {
    const result = await FacilitiesModel.find({ active: true });
    return res.status(StatusCodes.OK).json({ msg: "success", result });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error?.message });
  }
}

module.exports = { facilitiesController };
