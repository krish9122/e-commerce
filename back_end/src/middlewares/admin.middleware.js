import { ApiError } from "../utils/ApiError.js";

const admin = (req, res, next) => {
  if (req.user?.role === "admin") {
    next();
  } else {
    next(new ApiError(403, "Access denied. Admins only."));
  }
};

export default admin;