const admin = (req, res, next) => {
    if (req.user.role !== "admin") {
    next();
    } else {
        throw new ApiError(403, "Access denied. Admins only.");
    }
};

export default admin;