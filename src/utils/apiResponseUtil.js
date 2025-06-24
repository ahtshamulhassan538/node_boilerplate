module.exports = {
  successResponse: (res, data, message = "Success", statusCode = 200) => {
    return res.status(statusCode).json({
      status: true,
      statusCode: statusCode,
      message,
      data,
    });
  },

  errorResponse: (res, message, statusCode = 500) => {
    return res.status(statusCode).json({
      status: false,
      statusCode: statusCode,
      error: message || "Something went wrong",
    });
  },

  badResponse: (message, statusCode = 400) => {
    return {
      status: false,
      statusCode: statusCode,
      error: message || "Something went wrong",
    };
  },

  exceptionResponse: (res, error, statusCode = 500) => {
    return res.status(statusCode).json({
      status: false,
      statusCode: statusCode,
      message: error.message || "Something went wrong",
      trace: error.trace,
      line: error.line,
    });
  },
};
