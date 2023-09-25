const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../../model/admin/userSchema");
const { LoginDTO } = require("../../DTO/userDto");

function tokenController(req, res) {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "UNAUTHORIZED..!",
        status: StatusCodes.UNAUTHORIZED,
        isAuthorized: false,
      });
    }
    jwt.verify(
      token,
      process.env.USER_TOKEN_SECRET,
      async function (err, decoded) {
        if (err) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "UNAUTHORIZED..!",
            status: StatusCodes.UNAUTHORIZED,
            isAuthorized: false,
          });
        }
        //   console.log(decoded);
        const user = await UserModel.findById(decoded.id);

        return res.status(StatusCodes.OK).json({
          message: "SUCCESS..",
          status: StatusCodes.OK,
          isAuthorized: true,
          user: new LoginDTO(user),
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server Error.!",
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error,
    });
  }
}

module.exports = tokenController;
