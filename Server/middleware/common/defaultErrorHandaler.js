const { MulterError } = require("multer");

function defaultErrorHandler(err, req, res, next) {
  if (err) {
    if (err instanceof MulterError) {
      console.log("multer Error...");
      console.log(err)
      return res.status(400).send(err.message);
    }
    console.log(err);
  return  res.status(500).send(err.message);
  }
}
function notFoundHandler(req, res, next) {
 return res.status(404).send("404");
}
module.exports = { defaultErrorHandler, notFoundHandler };
