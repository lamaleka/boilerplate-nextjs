import { Dayjs } from "@/lib";

export interface SessionData {
  is_authenticated?: boolean;
  preferred_name?: string;
  occupation: string;
  username: string;
  sso: number;
  access_token: string;
  refresh_token: string;
  roles: string[];
  permissions: string[];
  created_at: string | Dayjs;
}
