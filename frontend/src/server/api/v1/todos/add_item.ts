import type { AddItemResponse } from '~/types/proto/todo_pb';

export default defineEventHandler<AddItemResponse>(() => {
  return {};
});
