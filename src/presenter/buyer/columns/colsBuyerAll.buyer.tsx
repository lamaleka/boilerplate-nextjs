import { ColIndex, ColDescription, ColBuyerCode, ColName, ColTaxNumber } from "@/components";
import { ColsProps, ColsType, Buyer } from "@/type";

export const colsBuyerAll = ({ params, handleSearch }: ColsProps<Buyer>): ColsType<Buyer> => [
  ColIndex({ params }),
  ColBuyerCode({ handleSearch }),
  ColName({ handleSearch }),
  ColTaxNumber({ handleSearch }),
  ColDescription({ handleSearch }),
];
