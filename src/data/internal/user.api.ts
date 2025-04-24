import { ENDPOINTS } from "@/constants";
import { BaseRequest, UserAll, UserOne, UserCreate, UserUpdate, ResponseMessage } from "@/type";
import { ApiBlueprint } from "../blueprint/api.blueprint";

export class UserApi extends ApiBlueprint {
  public static async all(params: BaseRequest) {
    return await this.getList<UserAll>(ENDPOINTS.masters.user.base, params);
  }
  public static async detail(id: string) {
    return await this.getOne<UserOne>(ENDPOINTS.masters.user.byId(id));
  }
  public static async create(payload: UserCreate) {
    return await this.post<UserOne, UserCreate>(ENDPOINTS.masters.user.base, payload);
  }
  public static async update(id: string, payload: UserUpdate) {
    return await this.put<UserOne, UserUpdate>(ENDPOINTS.masters.user.byId(id), payload);
  }
  public static async resetPassword(id: string) {
    return await this.put<UserOne>(ENDPOINTS.masters.user.resetPassword(id), null);
  }
  public static async delete(id: string) {
    return await this.del<ResponseMessage>(ENDPOINTS.masters.user.byId(id));
  }
}
