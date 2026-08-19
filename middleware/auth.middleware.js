const {
  UnauthorizedError,
  ForbiddenError,
  TokenExpiredError,
} = require("../utils/app-error");
const tokens = require("../utils/jwt");

/**
 * Authentication middleware for verifying Bearer access token.
 */
const authMiddleWare = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedError("Authorization header is missing");
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer" || !token) {
      throw new UnauthorizedError(
        'Invalid token format. Expected "Bearer <token>"',
      );
    }

    const decoded = tokens.verifyToken(token);
    req.user = decoded;

    req.userId = decoded.userId;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new TokenExpiredError(
        "Authentication token has expired. Please log in again.",
      );
    }

    if (error.name === "JsonWebTokenError") {
      throw new ForbiddenError("Invalid token");
    }
  }
};

/**
 * Authentication middleware for verifying Bearer access token.
 */
const adminMiddleWare = (req, res, next) => {
  console.log(req.user);

  if (req.user.role !== "admin") {
    throw new ForbiddenError("Access denied. Admin role required");
  }

  next();
};

/**
 * Authentication middleware for verifying refresh token.
 */
const authRefreshMiddleWare = (req, res, next) => {
  const authorization =
    req.headers.authorization || req.headers["x-refresh-token"];

  if (!authorization) {
    throw new UnauthorizedError("Refresh token is missing");
  }

  const token = authorization.startsWith("Bearer ")
    ? authorization.split(" ")[1]
    : authorization;

  if (!token) {
    throw new UnauthorizedError("Invalid refresh token format");
  }

  const decoded = tokens.verifyRefreshToken(token);
  req.user = decoded;
  req.userId = decoded.userId;

  next();
};

module.exports = {
  authMiddleWare,
  authRefreshMiddleWare,
  adminMiddleWare,
};
