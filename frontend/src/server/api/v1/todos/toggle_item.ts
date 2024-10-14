import type { ToggleItemResponse } from '~/types/proto/todo_pb';

export default defineEventHandler<ToggleItemResponse>(() => {
  return {};
});
