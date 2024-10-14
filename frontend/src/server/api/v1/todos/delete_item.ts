import type { DeleteItemResponse } from '~/types/proto/todo_pb';

export default defineEventHandler<DeleteItemResponse>(() => {
  return {};
});
