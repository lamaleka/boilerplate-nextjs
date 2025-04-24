import { DefaultOptionType } from "antd/lib/select";
import { User } from "../entity/user.type";

export class UserCreate {
  employee_id?: string;
  password: string;

  constructor(data: UserCreate) {
    this.employee_id = data.employee_id;
    this.password = data.password;
  }

  public static asPayload(e: UserCreate): UserCreate {
    return {
      employee_id: e.employee_id,
      password: e.password,
    };
  }
}

export class UserUpdate {
  employee_dropdown?: DefaultOptionType;
  employee_id?: string;
  password: string;

  constructor(data: UserUpdate) {
    this.employee_dropdown = data.employee_dropdown;
    this.employee_id = data.employee_id;
    this.password = data.password;
  }

  public static fromEntity(e?: User): UserUpdate {
    return {
      employee_dropdown: {
        key: e?.employee?.id,
        value: e?.employee?.id,
        label: `${e?.employee?.badge} - ${e?.employee?.nama}`,
      },
      employee_id: e?.employee?.id,
      password: "",
    };
  }
  public static asPayload(e: UserUpdate): UserUpdate {
    return {
      employee_id: e.employee_id,
      password: e.password,
    };
  }
}
