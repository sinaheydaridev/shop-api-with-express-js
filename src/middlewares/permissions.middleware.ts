// این دور روش که در پایین هست بستگی به نوع پروژه داره

enum UserRole {
  admin = "admin",
  staff = "staff",
}

const isAdmin = (req: any, res: any, next: any) => {
  if (req.user.role === UserRole.admin) next();
  return next(new Error());
};

// const isStaff = () => {}

// const isCustomer = () => {};

/* -------------------------------------------------------------------------- */
/*                                     OR                                     */
/* -------------------------------------------------------------------------- */
enum UserAccess {
  projects = "projects",
}

const canStaffViewUsers = () => {};

const canStaffViewProjects = (req: any, res: any, next: any) => {
  if (req.user.access === UserAccess.projects) next();
  return next(new Error());
};
