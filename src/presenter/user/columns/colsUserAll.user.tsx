import { ColEmployee, ColIndex, ColUsername } from "@/components";
import { ColsProps, ColsType, User } from "@/type";

export const colsUserAll = ({ params, handleSearch }: ColsProps<User>): ColsType<User> => [ColIndex({ params }), ColUsername({ handleSearch }), ColEmployee({})];
