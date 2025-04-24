import { Buyer } from "../entity/buyer.type";

export class BuyerRequest {
  name: string;
  code: string;
  tax_number: string;
  description?: string;

  constructor(data: BuyerRequest) {
    this.name = data.name;
    this.code = data.code;
    this.tax_number = data.tax_number;
    this.description = data.description;
  }

  public static asPayload(e: BuyerRequest): BuyerRequest {
    return {
      name: e.name,
      code: e.code,
      tax_number: `${e.tax_number}`,
      description: e.description,
    };
  }
  public static fromEntity(e?: Buyer): BuyerRequest {
    return {
      name: e?.name || "",
      code: e?.code || "",
      tax_number: `${e?.tax_number || ""}`,
      description: e?.description || "",
    };
  }
}
