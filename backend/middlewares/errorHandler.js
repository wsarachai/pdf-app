// middleware/errorHandler.js
// Centralized error handling middleware for habit-related operations

const handleCastError = (error) => {
  return {
    success: false,
    message: "Invalid resource ID format",
    statusCode: 400,
  };
};

const handleValidationError = (error) => {
  const errors = Object.values(error.errors).map((err) => ({
    field: err.path,
    message: err.message,
    value: err.value,
  }));

  return {
    success: false,
    message: "Validation failed",
    errors: errors,
    statusCode: 400,
  };
};

const handleDuplicateKeyError = (error) => {
  const field = Object.keys(error.keyValue)[0];
  return {
    success: false,
    message: `Duplicate value for field: ${field}`,
    statusCode: 400,
  };
};

const handleJsonWebTokenError = () => {
  return {
    success: false,
    message: "Invalid authentication token",
    statusCode: 401,
  };
};

const handleTokenExpiredError = () => {
  return {
    success: false,
    message: "Authentication token expired",
    statusCode: 401,
  };
};

const habitErrorHandler = (error, req, res, next) => {
  let handledError = {
    success: false,
    message: error.message || "Internal server error",
    statusCode: 500,
  };

  // Log error for debugging (in development)
  if (process.env.NODE_ENV === "development") {
    console.error("Error Details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
      path: req.path,
      method: req.method,
      body: req.body,
      params: req.params,
    });
  }

  // Mongoose Cast Error (Invalid ObjectId)
  if (error.name === "CastError") {
    handledError = handleCastError(error);
  }

  // Mongoose Validation Error
  else if (error.name === "ValidationError") {
    handledError = handleValidationError(error);
  }

  // JWT Errors
  else if (error.name === "JsonWebTokenError") {
    handledError = handleJsonWebTokenError();
  } else if (error.name === "TokenExpiredError") {
    handledError = handleTokenExpiredError();
  }

  // Send error response
  res.status(handledError.statusCode).json({
    success: handledError.success,
    message: handledError.message,
    ...(handledError.errors && { errors: handledError.errors }),
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
};

module.exports = habitErrorHandler;
