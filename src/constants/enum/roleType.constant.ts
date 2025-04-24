export enum RoleType {
  Admin = 1,
  Officer = 2,
  Buyer = 3,
}

export const RoleTypeColor: Record<string, string> = {
  1: "red",
  admin: "red",
  2: "blue",
  officer: "blue",
  3: "orange",
  buyer: "orange",
};
