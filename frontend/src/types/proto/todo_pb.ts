/* GENERATED FROM todo.proto. DO NOT EDIT MANUALLY. */
/* tslint:disabled */
/* eslint-disable */

import { APIRequest, HTTPMethod } from "protoc-gen-jsonpb-ts";

export namespace ToDoApi {
  export class GetItem implements APIRequest<GetItemRequest, GetItemResponse> {
    _response?: GetItemResponse;
    path = "/api/v1/todos/{id}";
    method: HTTPMethod = "get";
    constructor(public parameter: GetItemRequest) {}
  }
}

export interface Item {
  id?: string;
  title?: string;
  isComplete?: boolean;
}

export interface GetItemRequest {
  id?: string;
}

export interface GetItemResponse {
  item?: Item;
}
