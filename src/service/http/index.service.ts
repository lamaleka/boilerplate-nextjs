import { HandleAxiosError } from "@/utils";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class HttpService {
  private _axiosService: AxiosInstance;

  constructor(authRequest = true) {
    this._axiosService = axios.create({
      headers: { "Content-Type": "application/json" },
    });
    if (authRequest) this.requestMiddleware();
  }

  private requestMiddleware() {
    this._axiosService.interceptors.request.use(
      (config) => config,
      (error: Error) => Promise.reject(error),
    );
    this._axiosService.interceptors.response.use(
      (response: AxiosResponse) => {
        if (this.validateResponse(response.data)) {
          return Promise.resolve(response);
        } else {
          return Promise.reject(HandleAxiosError("Unknown or Invalid data received"));
        }
      },
      (error: Error) => {
        return Promise.reject(HandleAxiosError(error));
      },
    );
  }

  public GET<ResponseType = unknown, C = unknown>(url: string, config?: AxiosRequestConfig<C>) {
    return this._axiosService.get<ResponseType>(url, config);
  }

  public POST<Data = Record<string, unknown>, ResponseType = unknown, Config = unknown>(url: string, data: Data, config?: AxiosRequestConfig<Config extends Data ? any : any>) {
    return this._axiosService.post<ResponseType>(url, data, config);
  }

  public PUT<Data = Record<string, unknown>, ResponseType = unknown, Config = unknown>(url: string, data: Data, config?: AxiosRequestConfig<Config extends Data ? any : any>) {
    return this._axiosService.put<ResponseType>(url, data, config);
  }

  public PATCH<Data = Record<string, unknown>, ResponseType = unknown, Config = unknown>(url: string, data?: Data, config?: AxiosRequestConfig<Config extends Data ? any : any>) {
    return this._axiosService.patch<ResponseType>(url, data, config);
  }

  public DELETE<ResponseType = unknown, Config = unknown>(url: string, config?: AxiosRequestConfig<Config>) {
    return this._axiosService.delete<ResponseType>(url, config);
  }
  private validateResponse(data: ResponseType): boolean {
    return data && this.isValidResponseData(data);
  }

  private isValidResponseData(data: ResponseType): data is ResponseType {
    return data && typeof data === "object";
  }
}

const openHttp = new HttpService(false);
const http = new HttpService();

export { http, openHttp };
