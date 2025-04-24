import type { MenuProps } from "antd";

export type MenuItem = Required<MenuProps>["items"][number];

export interface AppMenuItem {
  key: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
  type?: any;
  children?: AppMenuItem[];
}

export function CreateMenuItem({ key, label, type, path, icon, children }: { key: string; label: string; type?: any; path: string; icon?: React.ReactNode; children?: AppMenuItem[] }): AppMenuItem {
  return {
    key,
    label,
    type,
    path,
    icon,
    children,
  } as AppMenuItem;
}
