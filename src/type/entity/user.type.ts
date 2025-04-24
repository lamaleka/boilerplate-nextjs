import { Employee } from "./employee.type";
import { Role } from "./role.type";

export interface User {
  created_at: string;
  employee: Employee;
  id: string;
  permissions: string[];
  roles: Role[];
  roles_slugs: string[];
  sso: boolean;
  is_active: boolean;
  updated_at: null;
  username: string;
}
