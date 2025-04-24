import { ENDPOINTS } from "@/constants";
import { BaseRequest, BuyerAll, BuyerOne, BuyerRequest, ResponseMessage } from "@/type";
import { ApiBlueprint } from "../blueprint/api.blueprint";

export class BuyerApi extends ApiBlueprint {
  public static async all(params: BaseRequest) {
    return await this.getList<BuyerAll>(ENDPOINTS.masters.buyer.base, params);
  }
  public static async detail(id: string) {
    return await this.getOne<BuyerOne>(ENDPOINTS.masters.buyer.byId(id));
  }
  public static async create(payload: BuyerRequest) {
    return await this.post<BuyerOne, BuyerRequest>(ENDPOINTS.masters.buyer.base, payload);
  }
  public static async update(id: string, payload: BuyerRequest) {
    return await this.put<BuyerOne, BuyerRequest>(ENDPOINTS.masters.buyer.byId(id), payload);
  }
  public static async delete(id: string) {
    return await this.del<ResponseMessage>(ENDPOINTS.masters.buyer.byId(id));
  }
}
