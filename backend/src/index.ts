import { createApp, createRouter, eventHandler, handleCors, readBody, setResponseStatus } from 'h3';
import { v4 as uuidv4 } from 'uuid';
import type {
  Item,
  GetItemsResponse,
  ToggleItemRequest,
  ToggleItemResponse,
  ToggleAllItemsResponse,
  EditTitleRequest,
  EditTitleResponse,
  AddItemRequest,
  AddItemResponse,
  DeleteItemRequest,
  DeleteItemResponse,
  ClearCompletedItemsRequest,
  ClearCompletedItemsResponse,
} from './types/proto/todo_pb';

const app = createApp();
const router = createRouter();

app.use(router);

let todos: Item[] = [];

router.use('**', eventHandler(async (event) => {
  const corsRes = handleCors(event, {
    origin: "*",
    preflight: {
      statusCode: 204,
    },
    methods: "*",
  });
  if (corsRes) {
    return;
  }

  switch (event.context.params._) {
    case '/api/v1/todos/get_items':
      return GetItems(event);
    case '/api/v1/todos/toggle_item':
      return ToggleItem(event);
    case '/api/v1/todos/toggle_all_items':
      return ToggleAllItems(event);
    case '/api/v1/todos/edit_title':
      return EditTitle(event);
    case '/api/v1/todos/add_item':
      return AddItem(event);
    case '/api/v1/todos/delete_item':
      return DeleteItem(event);
    case '/api/v1/todos/clear_completed_items':
      return ClearCompletedItems(event);
    default:
      setResponseStatus(event, 404);
      return "Not found";
  }
}));

const GetItems = async (event): Promise<GetItemsResponse> => {
  return { items: todos };
};

const ToggleItem = async (event): Promise<ToggleItemResponse> => {
  const body = await readBody(event) as ToggleItemRequest;
  const item = todos.find((todo) => todo.id === body.id);
  Object.assign(item, { ...item, isComplete: !item.isComplete });
  setResponseStatus(event, 200);
  return {};
};

const ToggleAllItems = async (event): Promise<ToggleAllItemsResponse> => {
  todos.forEach((todo) => {
    if (!todo.isComplete) {
      Object.assign(todo, { ...todo, isComplete: true });
    }
  });
  setResponseStatus(event, 200);
  return {};
};

const EditTitle = async (event): Promise<EditTitleResponse> => {
  const body = await readBody(event) as EditTitleRequest;
  const item = todos.find((todo) => todo.id === body.id);
  Object.assign(item, { ...item, title: body.title });
  setResponseStatus(event, 200);
  return {};
};

const AddItem = async (event): Promise<AddItemResponse> => {
  const body = await readBody(event) as AddItemRequest;
  todos.push({
    id: uuidv4(),
    title: body.title,
    isComplete: false,
  });
  setResponseStatus(event, 204);
  return {};
};

const DeleteItem = async (event): Promise<DeleteItemResponse> => {
  const body = await readBody(event) as DeleteItemRequest;
  todos = todos.filter((todo) => todo.id !== body.id);
  setResponseStatus(event, 204);
  return {};
};

const ClearCompletedItems = async (event): Promise<ClearCompletedItemsResponse> => {
  const body = await readBody(event) as ClearCompletedItemsRequest;
  todos = todos.filter((todo) => todo.isComplete === false);
  setResponseStatus(event, 204);
  return {};
};

export { app };
