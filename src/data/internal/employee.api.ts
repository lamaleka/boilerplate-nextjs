import { ENDPOINTS } from "@/constants";
import { BaseRequest, EmployeeAll, EmployeeOne, EmployeeRequest, ResponseMessage } from "@/type";
import { ApiBlueprint } from "../blueprint/api.blueprint";

export class EmployeeApi extends ApiBlueprint {
  public static async all(params: BaseRequest) {
    return await this.getList<EmployeeAll>(ENDPOINTS.masters.employee.base, params);
  }
  public static async detail(id: string) {
    return await this.getOne<EmployeeOne>(ENDPOINTS.masters.employee.byId(id));
  }
  public static async create(payload: EmployeeRequest) {
    return await this.post<EmployeeOne, EmployeeRequest>(ENDPOINTS.masters.employee.base, payload);
  }
  public static async update(id: string, payload: EmployeeRequest) {
    return await this.put<EmployeeOne, EmployeeRequest>(ENDPOINTS.masters.employee.byId(id), payload);
  }
  public static async updateStatus(id: string) {
    return await this.patch<ResponseMessage>(ENDPOINTS.masters.employee.byIdStatus(id));
  }
  public static async delete(id: string) {
    return await this.del<ResponseMessage>(ENDPOINTS.masters.employee.byId(id));
  }
}
