import { APIRequestContext, expect } from '@playwright/test';

export class BaseApi {
  protected readonly request: APIRequestContext;
  protected readonly baseURL: string;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  async get(path: string, headers: Record<string, string> = {}) {
    return await this.request.get(`${this.baseURL}${path}`, { headers });
  }

  async post(path: string, data: any, headers: Record<string, string> = {}) {
    return await this.request.post(`${this.baseURL}${path}`, {
      data,
      headers,
    });
  }

  async put(path: string, data: any, headers: Record<string, string> = {}) {
    return await this.request.put(`${this.baseURL}${path}`, {
      data,
      headers,
    });
  }

  async delete(path: string, headers: Record<string, string> = {}) {
    return await this.request.delete(`${this.baseURL}${path}`, { headers });
  }

  async assertStatus(response: any, code: number) {
    await expect(response.status()).toBe(code);
  }
}
