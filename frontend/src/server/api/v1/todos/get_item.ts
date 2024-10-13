import type { GetItemResponse } from '~/types/proto/todo_pb';

export default defineEventHandler<GetItemResponse>(() => ({
  item: {
    id: '1',
    title: 'Buy milk',
    isComplete: false,
  },
}));
