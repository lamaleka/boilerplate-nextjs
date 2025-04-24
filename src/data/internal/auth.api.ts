import { ENDPOINTS } from "@/constants";
import { LoginOne, LoginRequest } from "@/type";
import { ApiBlueprint } from "../blueprint/api.blueprint";

export class AuthApi extends ApiBlueprint {
  public static async verifySSO() {
    return await this.post<LoginOne>(ENDPOINTS.auth.verifySSO, null);
  }
  public static async login(payload: LoginRequest) {
    return await this.post<LoginOne>(ENDPOINTS.auth.login, payload);
  }
}
