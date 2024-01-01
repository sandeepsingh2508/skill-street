const jwt = require("jsonwebtoken");
const userDB = require("../models/user");
const response = require("../middlewares/responseMiddleware");
require("dotenv").config();

const isAuthorized = async (req, res, next) => {
  const token = req.headers.Authorization || req.headers.authorization;
  let decoded;
  if (!token) {
    return response.validationError(res, "Unauthorized");
  }

  try {
    decoded = jwt.verify(token, process.env.JWTSECRET);

    const user = await userDB.findOne({ _id: decoded.id });
    if (!user) {
      return response.notFoundError(res, "No user found");
    }

    req.user = user;
    req.decoded = decoded;
    req.role = decoded.role;
    return next();
  } catch (err) {
    console.log("error", err);
    response.internalServerError(res, err.message || "Internal server error");
  }
};

module.exports = { isAuthorized };
