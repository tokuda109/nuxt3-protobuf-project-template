import { createFetch, type $Fetch } from 'ofetch';
import type { APIRequest } from 'protoc-gen-jsonpb-ts';

class ApiClient {
  private baseUrl: string;

  private client: $Fetch;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.client = createFetch({
      defaults: {
        baseURL: this.baseUrl,
      },
    });
  }

  async request<Request, Response>(req: APIRequest<Request, Response>): Promise<Response> {
    return this.client(req.path, {
      method: req.method.toUpperCase(),
      body: req.parameter || {},
    });
  }
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const apiClient = new ApiClient(config.public.apiBase);

  return {
    provide: {
      apiClient,
    },
  };
});
