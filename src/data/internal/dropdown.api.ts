import { ENDPOINTS } from "@/constants";
import { BaseRequest, BuyerAll, EmployeeAll, EmployeeParams, KeyValueAll } from "@/type";
import { ApiBlueprint } from "../blueprint/api.blueprint";

export class DropdownApi extends ApiBlueprint {
  public static async allEmployee(params: EmployeeParams) {
    const response = await this.getList<EmployeeAll>(ENDPOINTS.dropdown.employee, params);
    return response.data;
  }
  public static async allEmployeeFromApi(params: EmployeeParams) {
    const response = await this.getList<EmployeeAll>(ENDPOINTS.dropdown.employeeApi, params);
    return response.data;
  }
  public static async allEmployeeUnregistered(params: EmployeeParams) {
    const response = await this.getList<EmployeeAll>(ENDPOINTS.dropdown.employeeUnregistered, params);
    return response.data;
  }
  public static async allBuyerUnregistered(params: BaseRequest) {
    const response = await this.getList<BuyerAll>(ENDPOINTS.dropdown.buyerUnregistered, params);
    return response.data;
  }
  public static async allRole(params: BaseRequest) {
    const response = await this.getList<KeyValueAll<number>>(ENDPOINTS.dropdown.role, params);
    return response.data;
  }
}
