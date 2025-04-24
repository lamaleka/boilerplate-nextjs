import { EP } from "@/constants";
import { http } from "@/service";
import { Failure } from "@/type";

export class ApiBlueprint {
  protected static async getList<T = any>(ep: EP, params?: any): Promise<T> {
    try {
      const response = await http.GET<T>(ep, { params });
      return response.data as T;
    } catch (e) {
      throw e as Failure;
    }
  }
  protected static async getOne<T = any>(ep: EP | string, params?: any): Promise<T> {
    try {
      const response = await http.GET<T>(ep, { params });
      return response.data as T;
    } catch (e) {
      throw e as Failure;
    }
  }
  protected static async post<T = any, D = any>(ep: EP | string, data: D, params?: any): Promise<T> {
    try {
      const response = await http.POST<D, T>(ep, data, { params });
      return response.data as T;
    } catch (e) {
      throw e as Failure;
    }
  }
  protected static async put<T = any, D = any>(ep: EP | string, data: D, params?: any): Promise<T> {
    try {
      const response = await http.PUT<D, T>(ep, data, { params });
      return response.data as T;
    } catch (e) {
      throw e as Failure;
    }
  }
  protected static async patch<T = any, D = any>(ep: EP | string, data?: D, params?: any): Promise<T> {
    try {
      const response = await http.PATCH<D, T>(ep, data, { params });
      return response.data as T;
    } catch (e) {
      throw e as Failure;
    }
  }
  protected static async del<T = any>(ep: EP | string, params?: any): Promise<T> {
    try {
      const response = await http.DELETE<T>(ep, { params });
      return response.data as T;
    } catch (e) {
      throw e as Failure;
    }
  }
  protected static async getBlob(ep: EP | string, params?: any): Promise<string> {
    try {
      const response = await http.GET<Blob>(ep, { params, responseType: "blob" });
      const url = URL.createObjectURL(response.data);
      return url;
    } catch (e) {
      throw e as Failure;
    }
  }
  protected static async upload<T>(ep: EP | string, file: File): Promise<T> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await http.PUT<FormData, T>(ep, formData, { headers: { "Content-Type": "multipart/form-data" } });
      return response.data as T;
    } catch (e) {
      throw e as Failure;
    }
  }
}
