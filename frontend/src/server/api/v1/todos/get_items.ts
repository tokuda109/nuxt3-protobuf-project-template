import type { GetItemsResponse } from '~/types/proto/todo_pb';

export default defineEventHandler<GetItemsResponse>(() => ({
  items: [
    {
      id: '1',
      title: 'Buy milk',
      isComplete: false,
    },
    {
      id: '2',
      title: 'Buy cheese',
      isComplete: false,
    },
    {
      id: '3',
      title: 'Buy tomato',
      isComplete: true,
    },
  ],
}));
