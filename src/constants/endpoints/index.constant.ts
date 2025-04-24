enum LIST {
  authLogin = "/api/auth/login",
  authVerifySSO = "/api/auth/verify-sso",
  dropdownEmployee = "/api/dropdown/employee",
  dropdownEmployeeApi = "/api/dropdown/employee/api",
  dropdownEmployeeUnregistered = "/api/dropdown/employee/unregistered",
  dropdownBuyerUnregistered = "/api/dropdown/buyer/unregistered",
  dropdownRole = "/api/dropdown/role",
  mastersUser = "/api/masters/user",
  mastersEmployee = "/api/masters/employee",
  mastersBuyer = "/api/masters/buyer",
}

export type EP = `${LIST}`;

export const ENDPOINTS = {
  auth: {
    login: LIST.authLogin,
    verifySSO: LIST.authVerifySSO,
  },

  dropdown: {
    employee: LIST.dropdownEmployee,
    employeeApi: LIST.dropdownEmployeeApi,
    employeeUnregistered: LIST.dropdownEmployeeUnregistered,
    buyerUnregistered: LIST.dropdownBuyerUnregistered,
    role: LIST.dropdownRole,
  },
  masters: {
    user: {
      base: LIST.mastersUser,
      byId: (id: string) => byId(LIST.mastersUser, id),
      resetPassword: (id: string) => byId(`${LIST.mastersUser}`, `${id}/reset-password`),
    },
    employee: {
      base: LIST.mastersEmployee,
      byId: (id: string) => byId(LIST.mastersEmployee, id),
      byIdStatus: (id: string) => byId(LIST.mastersEmployee, `${id}/status`),
    },
    buyer: {
      base: LIST.mastersBuyer,
      byId: (id: string) => byId(LIST.mastersBuyer, id),
    },
  },
};

const byId = (path: string, id: string) => `${path}/${id}`;
