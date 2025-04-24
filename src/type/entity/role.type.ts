export interface Role {
  id: number;
  slug: string;
  name: string;
  permissions: string[];
  created_at: string;
  updated_at?: string;
}
