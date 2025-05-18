const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || "Hitilafu ya ndani ya server",
  });
};

module.exports = errorHandler;