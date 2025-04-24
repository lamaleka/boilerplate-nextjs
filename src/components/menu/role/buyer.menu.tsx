import { ROUTES } from "@/constants";
import { AppMenuItem, CreateMenuItem } from "@/type";
import { PieChartOutlined, UserAddOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";

export const menuBuyer: AppMenuItem[] = [
  CreateMenuItem({
    key: ROUTES.dashboard,
    label: "Dashboard",
    path: ROUTES.dashboard,
    icon: <PieChartOutlined />,
  }),
  CreateMenuItem({
    key: ROUTES.masters.parent,
    label: "Master Data",
    icon: <UserOutlined />,
    path: "#",
    children: [
      CreateMenuItem({
        key: ROUTES.masters.employee.parent,
        path: ROUTES.masters.employee.parent,
        label: "Karyawan",
        icon: <UsergroupAddOutlined />,
      }),
      CreateMenuItem({
        key: ROUTES.masters.user.parent,
        path: ROUTES.masters.user.parent,
        label: "User",
        icon: <UserAddOutlined />,
      }),
    ],
  }),
];
