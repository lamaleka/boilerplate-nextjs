import { KeyValue } from "../common/keyValue.type";

export interface Employee {
  badge_uid?: string;
  id: string;
  nama: string;
  badge: string;
  dept_id: string;
  dept_title: string;
  email?: string;
  pos_id: string;
  pos_title: string;
  employee_type: KeyValue<number>;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}
