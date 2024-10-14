import type { ToggleAllItemsResponse } from '~/types/proto/todo_pb';

export default defineEventHandler<ToggleAllItemsResponse>(() => {
  return {};
});
