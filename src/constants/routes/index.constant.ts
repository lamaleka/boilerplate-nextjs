enum LIST {
  authLogin = "/auth/login",
  authLogout = "/auth/logout",
  authCheck = "/auth/check",
  sessionApiSession = "/auth/api/session",
  sso = "/sso",
  dashboard = "/dashboard",
  masters = "/masters",
  mastersEmployee = "/masters/employee",
  mastersEmployeeCreate = "/masters/employee/create",
  mastersEmployeeEdit = "/masters/employee/edit",
  mastersUser = "/masters/user",
  mastersUserCreate = "/masters/user/create",
  mastersUserEdit = "/masters/user/edit",
  mastersBuyer = "/masters/buyer",
  mastersBuyerCreate = "/masters/buyer/create",
  mastersBuyerEdit = "/masters/buyer/edit",
}
export type ROUTES = `${LIST}`;

export const ROUTES = {
  auth: {
    login: LIST.authLogin,
    logout: LIST.authLogout,
    check: LIST.authCheck,
    api: {
      session: LIST.sessionApiSession,
    },
  },
  sso: LIST.sso,
  dashboard: LIST.dashboard,
  masters: {
    parent: LIST.masters,
    employee: {
      parent: LIST.mastersEmployee,
      create: LIST.mastersEmployeeCreate,
      edit: (id: string) => `${LIST.mastersEmployeeEdit}/${id}`,
    },
    buyer: {
      parent: LIST.mastersBuyer,
      create: LIST.mastersBuyerCreate,
      edit: (id: string) => `${LIST.mastersEmployeeEdit}/${id}`,
    },
    user: {
      parent: LIST.mastersUser,
      create: LIST.mastersUserCreate,
      edit: (id: string) => `${LIST.mastersUserEdit}/${id}`,
    },
  },
};
