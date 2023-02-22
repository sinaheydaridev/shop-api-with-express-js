"use strict";
// این دور روش که در پایین هست بستگی به نوع پروژه داره
var UserRole;
(function (UserRole) {
    UserRole["admin"] = "admin";
    UserRole["staff"] = "staff";
})(UserRole || (UserRole = {}));
const isAdmin = (req, res, next) => {
    if (req.user.role === UserRole.admin)
        next();
    return next(new Error());
};
// const isStaff = () => {}
// const isCustomer = () => {};
/* -------------------------------------------------------------------------- */
/*                                     OR                                     */
/* -------------------------------------------------------------------------- */
var UserAccess;
(function (UserAccess) {
    UserAccess["projects"] = "projects";
})(UserAccess || (UserAccess = {}));
const canStaffViewUsers = () => { };
const canStaffViewProjects = (req, res, next) => {
    if (req.user.access === UserAccess.projects)
        next();
    return next(new Error());
};
//# sourceMappingURL=permissions.middleware.js.map