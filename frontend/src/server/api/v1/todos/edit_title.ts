import type { EditTitleResponse } from '~/types/proto/todo_pb';

export default defineEventHandler<EditTitleResponse>(() => {
  return {};
});
