const { ClassesModel } = require("../../model/admin/classesSchema");
const {StatusCodes}= require("http-status-codes");

async function classesController(req, res) {
  try {
    const result = await ClassesModel.find({ active: true });
    return res.status(StatusCodes.OK).json({ msg: "success", result });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error?.message });
  }
}

module.exports = { classesController };
