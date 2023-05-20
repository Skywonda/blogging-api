const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || err.message.message || "Something went wrong try again later",
  };
  console.log(err)

  return res.status(customError.statusCode).json({ msg: customError.msg, status: "error" });
};

module.exports = errorHandler;
