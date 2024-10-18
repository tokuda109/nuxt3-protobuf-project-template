/* GENERATED FROM todo.proto. DO NOT EDIT MANUALLY. */
/* tslint:disabled */
/* eslint-disable */

import { APIRequest, HTTPMethod } from "protoc-gen-jsonpb-ts";

export namespace ToDoApi {
  export class GetItems
    implements APIRequest<GetItemsRequest, GetItemsResponse> {
    _response?: GetItemsResponse;
    path = "/api/v1/todos/get_items";
    method: HTTPMethod = "post";
    constructor(public parameter: GetItemsRequest) {}
  }
  export class ToggleItem
    implements APIRequest<ToggleItemRequest, ToggleItemResponse> {
    _response?: ToggleItemResponse;
    path = "/api/v1/todos/toggle_item";
    method: HTTPMethod = "post";
    constructor(public parameter: ToggleItemRequest) {}
  }
  export class ToggleAllItems
    implements APIRequest<ToggleAllItemsRequest, ToggleAllItemsResponse> {
    _response?: ToggleAllItemsResponse;
    path = "/api/v1/todos/toggle_all_items";
    method: HTTPMethod = "post";
    constructor(public parameter: ToggleAllItemsRequest) {}
  }
  export class EditTitle
    implements APIRequest<EditTitleRequest, EditTitleResponse> {
    _response?: EditTitleResponse;
    path = "/api/v1/todos/edit_title";
    method: HTTPMethod = "post";
    constructor(public parameter: EditTitleRequest) {}
  }
  export class AddItem implements APIRequest<AddItemRequest, AddItemResponse> {
    _response?: AddItemResponse;
    path = "/api/v1/todos/add_item";
    method: HTTPMethod = "post";
    constructor(public parameter: AddItemRequest) {}
  }
  export class DeleteItem
    implements APIRequest<DeleteItemRequest, DeleteItemResponse> {
    _response?: DeleteItemResponse;
    path = "/api/v1/todos/delete_item";
    method: HTTPMethod = "post";
    constructor(public parameter: DeleteItemRequest) {}
  }
  export class ClearCompletedItems
    implements
      APIRequest<ClearCompletedItemsRequest, ClearCompletedItemsResponse> {
    _response?: ClearCompletedItemsResponse;
    path = "/api/v1/todos/clear_completed_items";
    method: HTTPMethod = "post";
    constructor(public parameter: ClearCompletedItemsRequest) {}
  }
}

export interface Item {
  id?: string;
  title?: string;
  isComplete?: boolean;
}

export interface GetItemsRequest {}

export interface GetItemsResponse {
  items?: Item[];
}

export interface ToggleItemRequest {
  id?: string;
}

export interface ToggleItemResponse {}

export interface ToggleAllItemsRequest {}

export interface ToggleAllItemsResponse {}

export interface EditTitleRequest {
  id?: string;
  title?: string;
}

export interface EditTitleResponse {}

export interface AddItemRequest {
  title?: string;
}

export interface AddItemResponse {}

export interface DeleteItemRequest {
  id?: string;
}

export interface DeleteItemResponse {}

export interface ClearCompletedItemsRequest {}

export interface ClearCompletedItemsResponse {}
