const { PopularTeacherModel } = require("../../model/admin/popularTeachersSchema");
const {StatusCodes}= require("http-status-codes");

async function apiPopularTeacherController(req, res) {
  try {
    const result = await PopularTeacherModel.find({ active: true });
    return res.status(StatusCodes.OK).json({ msg: "success", result });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error?.message });
  }
}

module.exports = { apiPopularTeacherController };
