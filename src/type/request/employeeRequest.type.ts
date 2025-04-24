import { EmployeeType } from "@/constants";
import { DefaultOptionType } from "antd/lib/select";
import { Employee } from "../entity/employee.type";

export class EmployeeRequest {
  employee_dropdown?: DefaultOptionType;
  badge: string;
  dept_id?: string;
  dept_title: string;
  nama: string;
  email?: string;
  pos_id?: string;
  pos_title: string;
  employee_type: EmployeeType;

  constructor(data: EmployeeRequest) {
    this.employee_dropdown = data.employee_dropdown;
    this.badge = data.badge;
    this.dept_id = data.dept_id;
    this.dept_title = data.dept_title;
    this.nama = data.nama;
    this.pos_id = data.pos_id;
    this.pos_title = data.pos_title;
    this.employee_type = data.employee_type;
  }

  public static asPayload(e: EmployeeRequest): EmployeeRequest {
    return {
      badge: e.badge,
      dept_id: e?.dept_id,
      dept_title: e.dept_title,
      nama: e.nama,
      email: e.email,
      pos_id: e?.pos_id,
      pos_title: e?.pos_title,
      employee_type: e.employee_type,
    };
  }
  public static fromEntity(e?: Employee): EmployeeRequest {
    return {
      badge: e?.badge ?? "",
      dept_id: e?.dept_id,
      dept_title: e?.dept_title ?? "",
      nama: e?.nama ?? "",
      email: e?.email,
      pos_id: e?.pos_id,
      pos_title: e?.pos_title ?? "",
      employee_type: e?.employee_type?.value ?? EmployeeType.TKO,
    };
  }
}
