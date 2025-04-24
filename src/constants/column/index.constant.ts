import { ColCellCore } from "@/type";

const index: ColCellCore = {
  title: "#",
  dataIndex: "id",
  key: "id",
};
const createdAt: ColCellCore = {
  title: "Tgl. Dibuat",
  dataIndex: "created_at",
  key: "created_at",
  colWidth: 130,
};
const description: ColCellCore = {
  title: "Deskripsi",
  dataIndex: "description",
  key: "description",
  colWidth: 106,
};
const label: ColCellCore = {
  title: "Judul",
  dataIndex: "label",
  key: "label",
};
const name: ColCellCore = {
  title: "Nama",
  dataIndex: "name",
  key: "name",
  colWidth: 100,
};
const title: ColCellCore = {
  title: "Judul",
  dataIndex: "title",
  key: "title",
  colWidth: 100,
};
const userName: ColCellCore = {
  title: "Nama Pengguna",
  dataIndex: "username",
  key: "username",
  colWidth: 152,
};
const employee: ColCellCore = {
  title: "Karyawan",
  dataIndex: "employee",
  key: "employee",
  colWidth: 100,
};
const roles: ColCellCore = {
  title: "Roles",
  dataIndex: "roles",
  key: "roles",
  colWidth: 76,
};
const rolesSlugs: ColCellCore = {
  title: "Roles Slugs",
  dataIndex: "roles_slugs",
  key: "roles_slugs",
};
const permissions: ColCellCore = {
  title: "Permissions",
  dataIndex: "permissions",
  key: "permissions",
};
const nama: ColCellCore = {
  title: "Nama",
  dataIndex: "nama",
  key: "nama",
};
const badge: ColCellCore = {
  title: "Badge",
  dataIndex: "badge",
  key: "badge",
};
const deptTitle: ColCellCore = {
  title: "Departemen",
  dataIndex: "dept_title",
  key: "dept_title",
};
const posTitle: ColCellCore = {
  title: "Posisi",
  dataIndex: "pos_title",
  key: "pos_title",
};
const currency: ColCellCore = {
  title: "Mata Uang",
  dataIndex: "currency",
  key: "currency",
};
const buyerCode: ColCellCore = {
  title: "Kode Buyer",
  dataIndex: "buyer_code",
  key: "buyer_code",
  colWidth: 126,
};
const taxNumber: ColCellCore = {
  title: "NPWP",
  dataIndex: "tax_number",
  key: "tax_number",
  colWidth: 126,
};
const isActive: ColCellCore = {
  title: "Aktif",
  dataIndex: "is_active",
  key: "is_active",
  colWidth: 90,
};
const action: ColCellCore = {
  title: "",
  dataIndex: "action",
  key: "action",
};
export const COLUMN = {
  action: action,
  createdAt: createdAt,
  description: description,
  index: index,
  label: label,
  name: name,
  title: title,
  nama: nama,
  userName: userName,
  employee: employee,
  roles: roles,
  rolesSlugs: rolesSlugs,
  permissions: permissions,
  badge: badge,
  deptTitle: deptTitle,
  posTitle: posTitle,
  currency: currency,
  buyerCode: buyerCode,
  taxNumber: taxNumber,
  isActive: isActive,
};
